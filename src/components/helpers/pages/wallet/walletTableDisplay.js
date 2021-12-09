import {useClassSetter} from "../../../../utils";
import {Body, BodyBold, Card, FlexBox} from "../../global";
import {Table} from "../../table";
import React from "react";

export const WalletTableDisplay = ({ balances }) => {
    const [baseClass, setClass] = useClassSetter("balances-table");

    const tableHead = [
        {
            key: 'fullName',
            translateTag: 'currency',
            handleItem: (fullName, row) => (
                <FlexBox className={baseClass}>
                    {row.img && (
                        <div className={setClass("image-wrapper")}>
                            <img src={row.img} alt={row.fullName} />
                        </div>
                    )}
                    <Body text={fullName} />
                </FlexBox>
            ),
            className: 'fit-content'
        },
        {
            key: 'amount',
            translateTag: 'balance',
            handleItem: (item, row) => <BodyBold text={`${item} ${row.symbol}`} />,
            className: 'fit-content',
            isSortable: true
        },
        {
            key: 'amountInGolos',
            translateTag: 'balanceInGolos',
            handleItem: (item) => <Body text={item} color="font-secondary" />,
            className: 'align-right',
            isSortable: true
        }
    ];

    return(
        <Card>
            {balances.length
                ? <Table tableHead={tableHead} rows={balances} />
                : "No data"
            }
        </Card>
    )
};