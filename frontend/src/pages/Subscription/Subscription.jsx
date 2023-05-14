import React  ,{useEffect,useState} from 'react';
import Navbar from '../../Layouts/Navbar/Navbar';
import { getLoggedInUserApi, getPrices, setStripeSession } from '../../utils/Api';
import { getLoggedInUserData } from '../../utils/services';
import "./Subscription.css";



const Subscription = () => {
    const [prices, setPrices] = useState([])
    const fetchPrices = async () => {
        const {data: response, status  } = await getPrices();
        if (status !== 200) throw Error(response.message);
        setPrices(response.data)
    }

    useEffect(()=>{
        fetchPrices();
    },[])

    const createSession = async (priceId) => {
        // const res = await getLoggedInUserApi();
        const loggedInUser = getLoggedInUserData();
        const { data: response, status } = await setStripeSession({
            priceId: priceId,
            email: loggedInUser.email,
            redirectUrl: process.env.REACT_APP_FRONTEND_URL
        });
        if (status !== 200) throw Error(response.message);
        window.location.href = response.url;
    }
  return (
    <>
        <Navbar />
        <div className={"subscription_container"}>
            <h1>Choose Your Plan</h1>
            <div class="pricing">
  <div class="pricing-plan">
    <h2>Basic</h2>
    <p><span>Free</span></p>
    <ul>
      <li>Watch Debate</li>
      <li>Live Chat on Debate</li>
      <li>Vote on Debate</li>
    </ul>
    {/* <a href="#">Sign up</a> */}
  </div>

    {
        prices.map(price => (
            <div class="pricing-plan" key={price.key}>
                <h2>Premium {price.recurring.interval === "month" ? " Monthly " : " Yearly " }</h2>
                <p><span>${price.unit_amount/100}</span> / {price.recurring.interval}</p>
                <ul>
                <li>Watch Debate</li>
                <li>Live Chat on Debate</li>
                <li>Vote on Debate</li>
                <li>Take Part in Debate</li>
                <li>Create Debate</li>
                </ul>
                <a onClick={() => createSession(price.id)}>Buy Now</a>
            </div>
        ))
    }
</div>
        </div>
    </>
  )
}

export default Subscription