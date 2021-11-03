import Image from 'next/dist/client/image';
import { useEffect, useRef } from 'react';
import Link from 'next/dist/client/link';
import { useRouter } from 'next/dist/client/router';
import Text from '../Text';
import s from './inspirationgrid.module.css';

const positionGridItems = (grid) => {
  if (!grid) return;
  const gridItems = grid.childNodes;

  const rowGap = parseInt(
    window.getComputedStyle(grid).getPropertyValue('grid-row-gap')
  );

  const rowHeight = parseInt(
    window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')
  );

  gridItems.forEach((item) => {
    const rowSpan = Math.ceil(
      item.children[0].offsetHeight / (rowHeight + rowGap)
    );

    item.style.setProperty('--row-span', `span ${rowSpan}`);
  });
};

const ImageWrapper = ({ pageURL, children, ...props }) =>
  pageURL ? (
    <a href={pageURL} rel="noopener noreferrer" target="_blank" {...props}>
      {children}
    </a>
  ) : (
    <div {...props}>{children}</div>
  );

const InspirationGrid = ({ images, boards, slug }) => {
  const router = useRouter();
  const masonry = useRef(null);

  useEffect(() => {
    positionGridItems(masonry.current);
  }, [router.asPath]);

  useEffect(() => {
    const handleResize = () => positionGridItems(masonry.current);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <div className={s.masonry} ref={masonry}>
        {images.map(({ image, pageURL }, index) => (
          <ImageWrapper pageURL={pageURL} className={s.masonryItem} key={index}>
            <Image
              src={image.thumbnail}
              height={image.height}
              width={image.width}
            />
          </ImageWrapper>
        ))}
      </div>
      <ul className={s.nav}>
        <li className={router.asPath === '/inspiration' ? s.active : ''}>
          <Link href="/inspiration">
            <a>
              <Text size="md" weight={500}>
                All
              </Text>
            </a>
          </Link>
        </li>
        {Object.keys(boards).map((board, index) => (
          <li key={index} className={board === slug ? s.active : ''}>
            <Link href={`/inspiration/${board}`}>
              <a>
                <Text size="md" weight={500}>
                  {board}
                </Text>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InspirationGrid;
