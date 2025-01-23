export const AUTHORS_LIST: Author[] =
  [
    {
      identify: 'lethanh',
      avatar: '/images/avatar/thanhlv.jpg',
      name: 'Lê Văn Thành',
      title: 'Java engineer và App engineer tại Line',
      links: [
        { icon: 'github', link: 'https://github.com/lethanh9398' },
        { icon: 'linkedin', link: 'https://linkedin.com/in/thanhlv-com' },
        { icon: 'facebook', link: 'https://www.facebook.com/lethanh9398' },
      ]
    }

  ]

export const AUTHORS = AUTHORS_LIST.reduce((result: any, item) => {
  result[item.identify] = item
  return result
}, {})


interface Author {
  identify: string
  name: string
  title: string
  avatar?: string | undefined
  links?: Link[]
}

interface Link {
  icon: string
  link: string
}
