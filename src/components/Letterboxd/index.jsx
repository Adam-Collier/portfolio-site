import Image from 'next/image';
import Link from 'next/link';
import Text from '../Text';
import Stack from '../Stack';

import s from './letterboxd.module.css';

const Letterboxd = ({ data }) => (
  <Stack direction="row" gap={1} className={s.letterboxd} justify="center">
    <div className={s.wrapper}>
      {data.map((film, index) => {
        const src = film.content.split('"')[1];
        const [title, ...rest] = film.title.split(',');
        const [year, rating] = rest.join('').split('-');

        return (
          <Link href={film.link} key={index}>
            <a className={s.film}>
              <Stack gap={0.5}>
                <Image
                  className={s.image}
                  src={src}
                  width={130}
                  height={195}
                  alt={film.title}
                />
                <Stack gap={0.125}>
                  <Text
                    size="xs"
                    color="primary-foreground"
                    lineHeight={1.3}
                    truncate={1}
                  >
                    {title}
                  </Text>
                  <Text size="xs" color="primary-foreground">
                    {year}
                  </Text>
                  <Text size="xs" color="primary-foreground" lineHeight={1}>
                    {rating}
                  </Text>
                </Stack>
              </Stack>
            </a>
          </Link>
        );
      })}
    </div>
  </Stack>
);

export default Letterboxd;
