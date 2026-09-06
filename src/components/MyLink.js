import Link from 'next/link'

export default function MyLink(props) {
  // defaults prefetch to false if `prefetch` is not true
  return <Link {...props} prefetch={props.prefetch ?? false} >{props?.children}</Link>
}
