import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Image.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const Image = forwardRef(({ src, alt, fallBack: customFallBack = images.noImage, className, ...pros }, ref) => {
    const [fallBack, setFallback] = useState('');
    const handlerError = () => {
        setFallback(customFallBack);
    };
    return (
        <img
            className={cx('wrapper', className)}
            ref={ref}
            src={fallBack || src}
            alt={alt}
            {...pros}
            onError={handlerError}
        />
    );
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    fallBack: PropTypes.string,
    className: PropTypes.string,
};

export default Image;
