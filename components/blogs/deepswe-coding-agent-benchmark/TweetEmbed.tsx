import { EmbeddedTweet, TweetNotFound } from 'react-tweet'
import { getTweet, type Tweet as TweetData } from 'react-tweet/api'

type TweetEmbedProps = {
  id: string
}

type TweetLike = TweetData | NonNullable<TweetData['quoted_tweet']>

function normalizeTweet<T extends TweetLike>(tweet: T): T {
  // X's syndication payload may omit empty entity arrays, but react-tweet iterates them.
  const normalized = {
    ...tweet,
    entities: {
      ...tweet.entities,
      hashtags: tweet.entities.hashtags ?? [],
      urls: tweet.entities.urls ?? [],
      user_mentions: tweet.entities.user_mentions ?? [],
      symbols: tweet.entities.symbols ?? [],
    },
  } as T

  if ('quoted_tweet' in normalized && normalized.quoted_tweet) {
    return {
      ...normalized,
      quoted_tweet: normalizeTweet(normalized.quoted_tweet),
    } as T
  }

  return normalized
}

export default async function TweetEmbed({ id }: TweetEmbedProps) {
  let tweet: TweetData | undefined
  let error: unknown

  try {
    tweet = await getTweet(id)
  } catch (err) {
    error = err
  }

  return (
    <div className="not-prose my-6 flex justify-center">
      <div className="w-full max-w-[550px]">
        {tweet ? <EmbeddedTweet tweet={normalizeTweet(tweet)} /> : <TweetNotFound error={error} />}
      </div>
    </div>
  )
}
