import {
  Component,
  computed,
  defineComponent,
  h,
  inject,
  InjectionKey, nextTick, onMounted,
  provide,
  Ref, watch
} from 'vue'
import {useData, useRoute} from 'vitepress'
import {
  Config,
  MultiSidebarConfig,
  SidebarConfig,
  SidebarGroup
} from '../config'
import {MenuItem, MenuItemChild} from '../../core'
import {normalizeLink} from '../support/utils'
import mediumZoom from 'medium-zoom';

const configSymbol: InjectionKey<Ref<Config>> = Symbol('config')

/**
 * Wrap root App component to provide the resolved theme config
 * so that we reuse the same computed ref across the entire app instead of
 * re-creating one in every consumer component.
 */
export function withConfigProvider(App: Component) {
  return defineComponent({
    name: 'VPConfigProvider',
    setup(_, { slots }) {
      const { theme } = useData()
      const config = computed(() => resolveConfig(theme.value))
      provide(configSymbol, config)
      const route = useRoute();
      const initZoom = () => {
        // @ts-ignore
        new mediumZoom('img:not(.no-zoom, .avatar-img)', {background: '11'}); // Should there be a new?
      };
      onMounted(() => {
        initZoom();
      });
      watch(
        () => route.path,
        () => nextTick(() => {
          initZoom()
        })
      );
      return () => h(App, null, slots)
    }
  })
}

export function useConfig() {
  return {
    config: inject(configSymbol)!
  }
}

function resolveConfig(config: Config): Config {
  return Object.assign(
    {
      appearance: true
    },
    config,
    {
      nav: config.nav?.map(normalizeMenuItem),
      sidebar: config.sidebar && normalizeSideBar(config.sidebar)
    }
  )
}

function normalizeMenuItem<T extends MenuItem | MenuItemChild>(item: T): T {
  if ('link' in item) {
    return Object.assign({}, item, {
      link: normalizeLink(item.link)
    })
  } else {
    return Object.assign({}, item, { items: item.items.map(normalizeMenuItem) })
  }
}

function normalizeSideBar(sidebar: SidebarConfig): SidebarConfig {
  if (Array.isArray(sidebar)) {
    return sidebar.map(normalizeMenuItem)
  } else {
    const ret: MultiSidebarConfig = {}
    for (const key in sidebar) {
      ret[key] = normalizeSideBar(sidebar[key]) as SidebarGroup[]
    }
    return ret
  }
}
