import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import config from '~/config';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    UserGroupIcon,
    LiveIcon,
    HomeActiveIcon,
    UserGroupActiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import { GET, APIGetSuggetedUser } from '~/api/Service/index';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Sidebar() {
    const [isSeeAllSuggestdUser, setIsSeeAllSuggestdUser] = useState(false);
    const [suggestedUser, setSuggestedUser] = useState([]);
    useEffect(() => {
        GET(APIGetSuggetedUser(), isSeeAllSuggestdUser ? { _limit: 20 } : {})
            .then((res) => {
                setSuggestedUser(res.data);
            })
            .catch((error) => console.log(error));
        // cleanup funcation
        return () => {};
    }, [isSeeAllSuggestdUser]);

    const handlerSeeAllSuggestedUser = () => {
        setIsSeeAllSuggestdUser((prev) => !prev);
    };

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem title="Live" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>
            <SuggestedAccounts
                label="Suggested Accounts"
                data={suggestedUser}
                isSeeAll={isSeeAllSuggestdUser}
                onSeeAll={handlerSeeAllSuggestedUser}
            />
            <SuggestedAccounts label="Following Accounts" onSeeAll={handlerSeeAllSuggestedUser} />
        </aside>
    );
}

export default Sidebar;
