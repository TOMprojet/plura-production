import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { pricingCards } from '@/lib/constants'
import { stripe } from '@/lib/stripe'
import clsx from 'clsx'
import { Dot } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'


export default async function Home() {
  const prices = await stripe.prices.list({
    product: process.env.NEXT_PLURA_PRODUCT_ID,
    active: true,
  })
  
  const selectedStrategy = 'Stratégie A';

  return (
    <>
    <section className="h-full w-full md:pt-44 mt-[-70px] relative flex items-center justify-center flex-col ">
        {/* grid */}

        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />
      <p className="text-center mt-64 mb-4">Le trading automatisé, pour tous</p>
      <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative mb-2">
        <h1 className="text-9xl font-bold text-center md:text-[150px] mb">
          Quantum
        </h1>
      </div>
      <div className="flex justify-center items-center relative md:mt-2">
        <Image
          src={'/assets/preview.png'}
          alt="banner image"
          height={1000}
          width={1000}
          className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
        />
        <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
      </div>
    </section>
      <section className="flex justify-center items-center flex-col gap-4 md:!mt-64 mt-[-60px]">
        <h2 className="text-4xl text-center"> Choisissez votre stratégie </h2>
        <p className="text-muted-foreground text-center">
          Retrouvez le détail de chaque stratégie dans l'onglet Documentation. Le 1er mois est offert.
        </p>
        <div className="flex  justify-center gap-4 flex-wrap mt-6 mb-16">
          {prices.data.map((card) => (
            //WIP: Wire up free product from stripe
            <Card
              key={card.nickname}
              className={clsx('w-[300px] flex flex-col justify-between', {
                'border-2 border-primary': card.nickname === selectedStrategy,
              })}
            >
              <CardHeader>
                <CardTitle
                  className={clsx('', {
                    'text-muted-foreground': card.nickname === 'Stratégie B',
                  })}
                >
                  {card.nickname}
                </CardTitle>
                <CardDescription>
                  {
                    pricingCards.find((c) => c.title === card.nickname)
                      ?.description
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold">
                  {card.unit_amount && `${card.unit_amount / 100}€`}
                </span>
                <span className="text-muted-foreground">
                  <span>/ mois </span>
                </span>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div>
                  {pricingCards
                    .find((c) => c.title === card.nickname)
                    ?.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex gap-2"
                      >
                        <Dot />
                        <p>{feature}</p>
                      </div>
                    ))}
                </div>
                <Link
                  href={`/agency?plan=${card.id}`}
                  className={clsx(
                    'w-full text-center bg-primary p-2 rounded-md',
                    {
                      '!bg-muted-foreground':
                        card.nickname !== 'Stratégie A',
                    }
                  )}
                >
                  Souscrire
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}
