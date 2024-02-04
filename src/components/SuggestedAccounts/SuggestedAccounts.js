import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import { useEffect, useState } from 'react';
import { GET, APIGetSuggetedUser } from '~/api/Service/index';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label, data = [], isSeeAll = false, onSeeAll }) {
    useEffect(() => {
        GET(APIGetSuggetedUser(), isSeeAll ? { _limit: 20 } : {}).then((res) => {
            console.log('Suggest: ', res.data);
            data = [...res.data];
        });
        // clean up function
        return () => {};
    }, [isSeeAll]);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {data.map((account) => (
                <AccountItem key={account.id} data={account} />
            ))}

            <p className={cx('more-btn')} onClick={onSeeAll}>
                {!isSeeAll ? 'See all' : 'See less'}
            </p>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
    isSeeAll: PropTypes.bool,
    onSeeAll: PropTypes.func.isRequired,
};

export default SuggestedAccounts;
