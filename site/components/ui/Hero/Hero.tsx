import React, { FC } from 'react'
import { Button, Container } from '@components/ui'
import { ArrowRight } from '@components/icons'
import s from './Hero.module.css'
import Link from 'next/link'
import cn from 'clsx'
import Image from 'next/image'
interface HeroProps {
  className?: string
  headline: string
  description: string | null
}

const Hero: FC<HeroProps> = ({ headline, description }) => {
  const titleCn = cn(s.title, 'display-md')

  const handleClick = (event: any) => {
    console.log('click')
  }
  return (
    <div className="bg-background">
      <Container>
        <div className={s.root}>
          <div className={s.wrapper}>
            <Image
              src="/hero_granola.png"
              alt="Yummy granola"
              // fill={true}
              className={s.img}
              width={756}
              height={116}
            />
          </div>
          <h2 className={titleCn}>{headline}</h2>
          <Link href="/search">
            <Button
              variant="flat"
              type="button"
              onClick={(e) => handleClick(e)}
              className="mt-2 mb-4"
            >
              Shop
            </Button>
          </Link>
          {!!description && (
            <div className={s.description}>
              <p>{description}</p>
              <Link
                href="/"
                className="flex items-center text-accent-0 pt-3 font-bold hover:underline cursor-pointer w-max-content"
              >
                Read it here
                <ArrowRight width="20" heigh="20" className="ml-1" />
              </Link>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Hero
