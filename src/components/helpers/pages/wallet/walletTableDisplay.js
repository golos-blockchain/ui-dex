import React from "react";
import {useClassSetter} from "../../../../utils";
import {Body, BodyBold, Card, FlexBox} from "../../global";
import {Table} from "../../table";

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
            )
        },
        {
            key: 'amount',
            translateTag: 'balance',
            handleItem: (item, row) => <BodyBold text={`${item} ${row.symbol}`} />,
            isSortable: true
        },
        {
            key: 'amountInGolos',
            translateTag: 'balanceInGolos',
            handleItem: (item) => <Body text={item} color="font-secondary" />,
            className: 'fit-content align-right',
            isSortable: true
        }
    ];

    return(
        <Card>
            {balances.length
                ? <Table tableHead={tableHead} rows={balances} className="padding-medium" disableDivider />
                : "No data"
            }
        </Card>
    )
};