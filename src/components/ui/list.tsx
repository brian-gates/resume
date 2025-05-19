import { ComponentProps } from 'react'
import { cn } from '~/lib/utils'

function UnorderedList({ className, ...props }: ComponentProps<'ul'>) {
  return <ul className={cn('list-disc pl-5 space-y-1', className)} {...props} />
}

function OrderedList({ className, ...props }: ComponentProps<'ol'>) {
  return <ol className={cn('list-decimal pl-5 space-y-1', className)} {...props} />
}

type ListProps =
  | ({ as?: 'ul' } & ComponentProps<'ul'>)
  | ({ as: 'ol' } & ComponentProps<'ol'>)

export function List(props: ListProps) {
  if (props.as === 'ol') {
    return <OrderedList {...props} />
  }
  return <UnorderedList {...props} />
}

export function ListItem({ className, ...props }: ComponentProps<'li'>) {
  return <li className={cn('text-muted-foreground', className)} {...props} />
} 