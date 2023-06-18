import { OperationBox } from "components/operation-box";
import { OperationBoxesSection } from "components/operation-boxes-section";
import { auth } from "firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import balanceIcon from 'assets/images/portfolio-balance-cash.png';
import { Chart } from 'react-google-charts';
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import stake from 'assets/images/stake.png';
import profitImage from 'assets/images/profit.png';
import { getFormattedDates, fetchUrl, isAuthenticated } from "utils/utilities";
import { BalanceBox } from "components/balance-box";
import market from 'assets/images/market.png';
import { DashboardNav } from "components/dashboard-nav";
import newsImage from 'assets/images/news-image.jpg';

export default function Dashboard({wallet}) {
    const navigate = useNavigate();
    const [goodsArrangement, setGoodsArrangement] = useState([]);
    const [balance, setBalance] = useState();
    const [goodPrices, setGoodPrices] = useState([]);
    const [formattedDates] = useState([]);
    const [goodPricesWithDates, setGoodPricesWithDates] = useState();
    const [newestCryptoArticle, setNewestCryptoArticle] = useState({});
    const [pnl, setPnl] = useState([]);
    const [profit, setProfit] = useState();
    useMemo(() => { getFormattedDates(formattedDates) });

    const arrangementOptions = {
        colors: ['#FFB200', "#5D60FA", "#16D509", '#6F09D5'],
        legend: { position: 'right', textStyle: { color: 'black', fontSize: 15 }, alignment: "center" },
        height: '200px',
        fontSize: 15,
        chartArea: { height: "100%" }
    }
    const columnChartOptions = {
        fontSize: 13,
        hAxis: { format: 'currency' }
    }
    const goodPricesChartOptions = {
        curveType: "function",
        legend: { position: 'bottom' },
        series: {
            0: { color: '#ff9e00' }
        },
        lineWidth: "4",
        fontSize: 10,

    }
    function handleSpaceChange(space, interval) {
        ;

        let dataArr = [];
        let goodPriceWithDatesArr = [[interval, "BTC"]];
        let it = 0;
        let monthCount = Math.ceil(goodPricesWithDates.length) / 4;
        for (let i = 0; i < goodPricesWithDates.length; i++) {
            if (i === 0 && i === 1) {
                dataArr.push(goodPricesWithDates[i][0]);
            }
            if (space === 14 && i + it <= goodPricesWithDates.length - 1) {
                dataArr.push(goodPricesWithDates[i + it][0]);
                it++;

            }
            if (space === 31 && dataArr.length < monthCount) {
                dataArr.push(goodPricesWithDates[i + it][0]);
                it += 3;

            }
            if (space === 7) {
                dataArr.push(goodPricesWithDates[i][0]);
            }
        }
        dataArr.push(goodPricesWithDates[goodPricesWithDates.length - 1][6]);
        goodPriceWithDatesArr.push(dataArr[0]);
        for (let i = 1; i < dataArr.length; i++) {
            setGoodPrices(goodPriceWithDatesArr);
            goodPriceWithDatesArr.push(dataArr[i]);
        }
    }
    isAuthenticated(navigate);
    useEffect(() => {
        new Promise(async (resolve, reject) => {
            try {
                await fetchUrl(`${encodeURI("https://newsdata.io/api/1/news?apikey=pub_246317184937fe6b0f1944b98a708d1a0e08d&q=bitcoin&country=us&language=en&category=business ")}`, getArticle);
                await fetchUrl("https://cryptel-990b59aa4ff1.herokuapp.com/api/prices", getPrices);
                await fetchUrl('https://cryptel-990b59aa4ff1.herokuapp.com/api/user-data', getUserData);
            }
            catch (err) {
                console.log('failed to fetch');
                reject(err);
            }
            resolve("fetched");
        });
    }, []);
    async function getArticle(data) {
        setNewestCryptoArticle({
            title: data.results[0].title,
            description: data.results[0].description,
            link: data.results[0].link,
            image: data.results[0].image_url
        });
    }
    async function getPrices(data) {
        var goodPricesArr = [];
        var goodPricesDateArr = [];
        var dateIterator = formattedDates.length - 1;
        for (const [key, value] of Object.entries(data)) {
            for (const [pricesArrKey, pricesArrValue] of Object.entries(value))
                if (pricesArrKey === "btc") {
                    goodPricesArr.push(pricesArrValue);
                }
        }
        for (let i = goodPricesArr.length - 1; i >= 0; i--) {
            let oneWeekPriceDateArr = [];
            for (let j = goodPricesArr[0].length - 1; j >= 0; j--) {
                oneWeekPriceDateArr.push([formattedDates[dateIterator], goodPricesArr[i][j]]);
                dateIterator--;
            }
            oneWeekPriceDateArr.reverse();
            goodPricesDateArr.push(oneWeekPriceDateArr);
        }
        goodPricesDateArr = goodPricesDateArr.reverse();
        setGoodPricesWithDates(goodPricesDateArr);
        let goodPricesDateArrCopy = [["Week", "BTC"]];
        for (let i = 0; i < goodPricesDateArr.length; i++) {
            setGoodPrices(goodPricesDateArrCopy);
            goodPricesDateArrCopy.push(goodPricesDateArr[i][0]);
            if (i === goodPricesDateArr.length - 1) {
                goodPricesDateArrCopy.push(goodPricesDateArr[i][6]);
            }
        }
    }
    async function getUserData(data) {
        console.log(data);
        let goodData = [["Cryptocurrency", "Arrangement"]];
        let pnlData = [['Element', 'PNL $ ', { role: 'style' }]];
        for (let i = 0; i < data.goodsOwned.length; i++) {
            goodData.push([data.goodsOwned[i], data.goodsArrangement[i]]);

        }
        let color;
        let it = formattedDates.length - 31;
        for (let i = 0; i < 31; i++) {
            if (data.pnl[i] < 0) {
                color = "#FE1F00";
            }
            else {
                color = "#32FE00";
            }
            pnlData.push([`${formattedDates[it]}`, data.pnl[i], color]);
            it++;
            setPnl(pnlData);
        }
        setGoodsArrangement(goodData);
        setBalance(data.balance);
        setProfit(data.totalProfit);
    }
    return (
        <main id="dashboard">
            <DashboardNav wallet={wallet} redirect="Wallet"/>
            <section id="operation-dashboard">
                <OperationBoxesSection>
                    <OperationBox>
                        <BalanceBox image={balanceIcon} heading="Portfolio Balance" data={balance} />
                    </OperationBox>
                    <OperationBox>
                        <BalanceBox image={profitImage} heading="Total Profit" data={`${profit} USD`} />
                    </OperationBox>
                    <OperationBox>
                        <BalanceBox image={stake} heading="Staked crypto in USD" data="2420 USD" />
                    </OperationBox>
                </OperationBoxesSection>
                <OperationBoxesSection>
                    <OperationBox>
                        <h1>Portfolio Arrangement</h1>
                        <p>The chart represents the amount of a certain cryptocurrency in percents</p>
                        <Chart
                            chartType="PieChart"
                            data={goodsArrangement}
                            width={"100%"}
                            options={arrangementOptions}
                        />
                    </OperationBox>
                    <OperationBox>
                        <h1>Go to market</h1>
                        <img src={market} alt="cryptocurrency market" className="market-image" />
                        <Link to='/market'><button className="market-btn">Go to market</button></Link>
                    </OperationBox>
                    <OperationBox>
                        <h1>PNL Based On Latest Month</h1>
                        <Chart
                            chartType="ColumnChart"
                            data={pnl}
                            width={"100%"}
                            height={"80%"}
                            options={columnChartOptions}
                        />
                    </OperationBox>
                </OperationBoxesSection>
                <OperationBoxesSection>
                    <OperationBox>
                        <h1>Your Latest Bought Cryptocurrency - Chart</h1>
                        <Chart
                            chartType="LineChart"
                            width={"100%"}
                            height={"70%"}
                            options={goodPricesChartOptions}
                            data={goodPrices}
                        >

                        </Chart>
                        <div id="interval-panel">
                            <button onClick={() => { handleSpaceChange(7, "Week") }}>Weeks</button>
                            <button onClick={() => { handleSpaceChange(14, "Bi-Week") }}>Bi-Weekly</button>
                            <button onClick={() => { handleSpaceChange(31, "Month") }}>Months</button>
                        </div>
                    </OperationBox>
                    <OperationBox>
                        <div id="news-panel">
                            <img src={newestCryptoArticle.image == 'null' ? newestCryptoArticle.image : newsImage} />
                            <div className="article-literal">
                                <h1><Link to={newestCryptoArticle.link}>{newestCryptoArticle.title}</Link></h1>
                                <p>{newestCryptoArticle.description}</p>
                            </div>
                        </div>
                    </OperationBox>
                </OperationBoxesSection>
            </section>
        </main>
    )
}