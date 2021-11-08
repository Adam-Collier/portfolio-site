import Image from 'next/dist/client/image';
import { useEffect, useRef } from 'react';
import Link from 'next/dist/client/link';
import { useRouter } from 'next/dist/client/router';
import { ArrowUpRight } from 'react-feather';
import Text from '../Text';
import s from './inspirationgrid.module.css';

// solution taken from https://css-tricks.com/a-lightweight-masonry-solution/
const positionGridItems = (grid, numberOfColumns, setNumberOfColumns) => {
  if (grid && getComputedStyle(grid).gridTemplateRows !== 'masonry') {
    const gridItems = [...grid.childNodes];
    const rowGap = parseInt(window.getComputedStyle(grid).gridRowGap);

    // window.getComputedStyle(grid).gridTemplateColumns returns the rendered grid-template-columns values
    // e.g grid-template-columns: 200px 200px 200px 200px is rendered and we return 200px 200px 200px 200px
    // we then split by the spaces and get the length
    const computedNumberOfColumns = window
      .getComputedStyle(grid)
      .gridTemplateColumns.split(' ').length;

    if (computedNumberOfColumns !== numberOfColumns) {
      setNumberOfColumns(computedNumberOfColumns);

      // revert to initial positioning, remove margin
      gridItems.forEach((item) => item.style.removeProperty('margin-top'));

      if (computedNumberOfColumns > 1) {
        gridItems.slice(computedNumberOfColumns).forEach((item, index) => {
          const imgAboveBottomPosition = gridItems[
            index
          ].getBoundingClientRect().bottom;
          const topOfCurrentImage = item.getBoundingClientRect().top;

          item.style.marginTop = `${
            imgAboveBottomPosition + rowGap - topOfCurrentImage
          }px`;
        });
      }
    }
  }
};

const ImageWrapper = ({ pageURL, children, ...props }) =>
  pageURL ? (
    <a href={pageURL} rel="noopener noreferrer" target="_blank" {...props}>
      {children}
      <ArrowUpRight className={s.arrow} size={16} />
    </a>
  ) : (
    <div {...props}>{children}</div>
  );

const InspirationGrid = ({ images, boards, slug }) => {
  const router = useRouter();
  const masonry = useRef(null);

  // store the current number of columns here in a useRef
  const numberOfColumns = useRef(0);

  // create a function we can call to update the number of columns
  const setNumberOfColumns = (updatedNumberOfColumns) => {
    numberOfColumns.current = updatedNumberOfColumns;
  };

  useEffect(() => {
    // when the route has changed reset the number of columns so the positionGridItems function runs
    setNumberOfColumns(0);

    positionGridItems(
      masonry.current,
      numberOfColumns.current,
      setNumberOfColumns
    );
  }, [router.asPath]);

  useEffect(() => {
    const handleResize = () =>
      positionGridItems(
        masonry.current,
        numberOfColumns.current,
        setNumberOfColumns
      );
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <div className={s.masonry} ref={masonry}>
        {images.map(({ image, pageURL, color }, index) => (
          <ImageWrapper
            pageURL={pageURL}
            className={s.masonryItem}
            key={index}
            style={{ background: color }}
          >
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
              <Text size="base" weight={500}>
                All
              </Text>
            </a>
          </Link>
        </li>
        {Object.keys(boards).map((board, index) => (
          <li key={index} className={board === slug ? s.active : ''}>
            <Link href={`/inspiration/${board}`}>
              <a>
                <Text size="base" weight={500}>
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
