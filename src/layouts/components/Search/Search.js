import { useEffect, useState, memo, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { SearchIcon } from '~/components/Icons';
import { APISearchUser, GET, GET_ASYNC, GET_CALBACK } from '~/api/Service';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const inputSearchElement = useRef();

    const debounceValue = useDebounce(searchValue, 600);

    useEffect(() => {
        setShowLoading(true);
        let searchValueNew = debounceValue.trim();
        if (!debounceValue) {
            setSearchResult([]);
            setShowLoading(false);
            return;
        }
        // fetch(APISearchUser_bak(searchValueNew))
        //     .then((data) => {
        //         return data.json();
        //     })
        //     .then((res) => {
        //         setSearchResult(res);
        //         setShowLoading(false);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         setShowLoading(false);
        //     });

        // (async function () {
        //     const res = await GET_ASYNC(APISearchUser(), { q: searchValueNew });
        //     console.log(res);
        //     setSearchResult(res);
        //     setShowLoading(false);
        // })();

        GET(APISearchUser(), { q: searchValueNew })
            .then((res) => {
                setSearchResult(res.data);
                setShowLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setShowLoading(false);
            });

        // cleanup function
        return () => {};
    }, [debounceValue]);

    const handlerChangeSearchInput = (event) => {
        setSearchValue(event.target.value?.trimStart());
    };

    const handlerClearBtn = () => {
        setSearchResult([]);
        setSearchValue('');
        inputSearchElement.current.focus();
    };

    const hanlderHideResult = () => {
        setShowResult(false);
    };

    return (
        /**
         * FIX TIPPY WARNING
         * Interactive tippy element may not be accessible via keyboard navigation because it is not directly after the reference element in the DOM source order. Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
         * Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
         */
        <div>
            <HeadlessTippy
                interactive
                visible={!!showResult && !!(searchResult.length > 0)}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((item) => (
                                <AccountItem key={item.id} data={item} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={hanlderHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputSearchElement}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        value={searchValue}
                        onChange={handlerChangeSearchInput}
                        onFocus={() => setShowResult(true)}
                    />

                    {!!searchValue && !showLoading && (
                        <button className={cx('clear')} onClick={handlerClearBtn}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {showLoading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(event) => event.preventDefault()}>
                        {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default memo(Search);
