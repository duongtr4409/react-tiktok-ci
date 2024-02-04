import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    // faSignIn,
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faUser,
    faCoins,
    faGear,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import Button from '~/components/Button';
import { Menu as PopperMenu } from '~/components/Popper';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons/Icons';
import Image from '~/components/Image';
import Search from '../Search';
// import routesConfig from '~/config/routes';
import config from '~/config';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'En',
                    title: 'English',
                    type: 'language',
                },
                {
                    code: 'Vi',
                    title: 'Tiếng Việt (Việt Nam)',
                    type: 'language',
                },
                {
                    code: 'ال',
                    title: 'العربية',
                    type: 'language',
                },
                {
                    code: 'বা',
                    title: 'বাঙ্গালি (ভারত)',
                    type: 'language',
                },
                {
                    code: 'Ce',
                    title: 'Cebuano (Pilipinas)',
                    type: 'language',
                },
                {
                    code: 'Če',
                    title: 'Čeština (Česká republika)',
                    type: 'language',
                },
                {
                    code: 'De',
                    title: 'Deutsch',
                    type: 'language',
                },
                {
                    code: 'Ελ',
                    title: 'Ελληνικά (Ελλάδα)',
                    type: 'language',
                },
                {
                    code: 'Es',
                    title: 'Español',
                    type: 'language',
                },
                {
                    code: 'Su',
                    title: 'Suomi (Suomi)',
                    type: 'language',
                },
                {
                    code: 'Fi',
                    title: 'Filipino (Pilipinas)',
                    type: 'language',
                },
                {
                    code: 'Fr',
                    title: 'Français',
                    type: 'language',
                },
                {
                    code: 'עב',
                    title: 'עברית (ישראל)',
                    type: 'language',
                },
                {
                    code: 'हि',
                    title: 'हिंदी',
                    type: 'language',
                },
                {
                    code: 'Ma',
                    title: 'Magyar (Magyarország)',
                    type: 'language',
                },
                {
                    code: 'Ba',
                    title: 'Bahasa Indonesia (Indonesia)',
                    type: 'language',
                },
                {
                    code: 'It',
                    title: 'Italiano (Italia)',
                    type: 'language',
                },
                {
                    code: '日本',
                    title: '日本語（日本）',
                    type: 'language',
                },
                {
                    code: 'Ba',
                    title: 'Basa Jawa (Indonesia)',
                    type: 'language',
                },
                {
                    code: 'ខ្',
                    title: 'ខ្មែរ (កម្ពុជា)',
                    type: 'language',
                },
                {
                    code: '한국',
                    title: '한국어 (대한민국)',
                    type: 'language',
                },
                {
                    code: 'Ba',
                    title: 'Bahasa Melayu (Malaysia)',
                    type: 'language',
                },
                {
                    code: 'မြ',
                    title: 'မြန်မာ (မြန်မာ)',
                    type: 'language',
                },
                {
                    code: 'Ne',
                    title: 'Nederlands (Nederland)',
                    type: 'language',
                },
                {
                    code: 'Po',
                    title: 'Polski (Polska)',
                    type: 'language',
                },
                {
                    code: 'Po',
                    title: 'Português (Brasil)',
                    type: 'language',
                },
                {
                    code: 'Ro',
                    title: 'Română (Romania)',
                    type: 'language',
                },
                {
                    code: 'Ру',
                    title: 'Русский (Россия)',
                    type: 'language',
                },
                {
                    code: 'Sv',
                    title: 'Svenska (Sverige)',
                    type: 'language',
                },
                {
                    code: 'ไท',
                    title: 'ไทย (ไทย)',
                    type: 'language',
                },
                {
                    code: 'Tü',
                    title: 'Türkçe (Türkiye)',
                    type: 'language',
                },
                {
                    code: 'Ук',
                    title: 'Українська (Україна)',
                    type: 'language',
                },
                {
                    code: 'ار',
                    title: 'اردو',
                    type: 'language',
                },
                {
                    code: '简体',
                    title: '简体中文',
                    type: 'language',
                },
                {
                    code: '繁體',
                    title: '繁體中文',
                    type: 'language',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const currentUser = { name: 'DuowngTora' };

    const handlerMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // handler change language
                break;
            default:
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@duowngtora',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <img src={images.logo} alt="Tiktok" />
                    </Link>
                </div>

                <Search />

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy content="Upload video" placement="bottom" delay={[0, 300]}>
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy content="Chat" placement="bottom" delay={[0, 300]}>
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy content="Message" placement="bottom" delay={[0, 300]}>
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary>Login</Button>
                        </>
                    )}

                    <PopperMenu items={currentUser ? userMenu : MENU_ITEMS} onChange={handlerMenuChange}>
                        {currentUser ? (
                            <Image
                                src="https://i.pinimg.com/736x/6e/af/1a/6eaf1a844ae4b6fa6eeb6ff17f468cc0.jpg"
                                className={cx('user-avatar')}
                                alt="DuowngTora"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </PopperMenu>
                </div>
            </div>
        </header>
    );
}

export default Header;
