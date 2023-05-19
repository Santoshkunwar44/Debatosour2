import React, { useEffect, useState } from "react";
import { Tag, Popconfirm } from "antd";
import { useToast } from "@chakra-ui/react";
import Navbar from "../../Layouts/Navbar/Navbar";
import {
  getPrices,
  setStripeSession,
  cancelSubscriptionApi,
  getLoggedInUserApi,
} from "../../utils/Api";
import "./Subscription.css";
import { useSelector } from "react-redux";
import { AddLoggedInUser } from "../../redux/action/actionCreators";

const Subscription = () => {
  const [prices, setPrices] = useState([]);
  const [subStatus, setSubStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { data: loggedInUserData } = useSelector((state) => state.user);
  const toast = useToast();
  const fetchPrices = async () => {
    const { data: response, status } = await getPrices();
    if (status !== 200) throw Error(response.message);
    setPrices(response.data);
  };

  useEffect(() => {
    fetchPrices();
    setSubStatus(loggedInUserData.subscription.status);
  }, [loggedInUserData.subscription.status]);

  useEffect(() => {}, []);

  const createSession = async (priceId) => {
    const { data: response, status } = await setStripeSession({
      priceId: priceId,
      userId: loggedInUserData._id,
      redirectUrl: process.env.REACT_APP_FRONTEND_URL,
    });
    if (status !== 200) throw Error(response.message);
    window.location.href = response.url;
  };

  const cancelSubscription = async () => {
    const { data: response, status } = await cancelSubscriptionApi({
      subscriptionId: loggedInUserData.subscription.subscriptionId,
    });
    if (status !== 200) throw Error(response.message);
    const res = await getLoggedInUserApi();
    console.log("*res: ", res);
    if (res.status === 200) {
      setSubStatus(res.data.message.subscription.status);
      AddLoggedInUser(res.data.message);
      setOpen(false);
      setConfirmLoading(false);
    }
    toast({
      title: "",
      description: "Subscription has been canceled successfully",
      status: "success",
      duration: 5000,
      position: "top",
      isClosable: true,
    });
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const showPopconfirm = () => {
    setOpen(true);
  };
  return (
    <>
      <Navbar />
      <div className={"subscription_container"}>
        <h1>Choose Your Plan</h1>
        <div class="pricing">
          <div class="pricing-plan">
            <h2>Basic</h2>
            <p>
              <span>Free</span>
            </p>
            <ul>
              <li>Watch Debate</li>
              <li>Live Chat on Debate</li>
              <li>Vote on Debate</li>
            </ul>
          </div>

          {prices.map((price) => (
            <div class="pricing-plan" key={price.key}>
              <h2>
                Premium{" "}
                {price.recurring.interval === "month"
                  ? " Monthly "
                  : " Yearly "}{" "}
              </h2>
              <h3>
                {subStatus === "active" &&
                  loggedInUserData.subscription.plan ===
                    price.recurring.interval && (
                    <Tag color="green">Current Plan</Tag>
                  )}
              </h3>
              <p>
                <span>${price.unit_amount / 100}</span> /{" "}
                {price.recurring.interval}
              </p>
              <ul>
                <li>Watch Debate</li>
                <li>Live Chat on Debate</li>
                <li>Vote on Debate</li>
                <li>Take Part in Debate</li>
                <li>Create Debate</li>
              </ul>
              {subStatus === "active" &&
              loggedInUserData.subscription.plan ===
                price.recurring.interval ? (
                <Popconfirm
                  title="Cancel Subscription"
                  description="Are you sure, you want to cancel?"
                  open={open}
                  onConfirm={cancelSubscription}
                  okButtonProps={{
                    loading: confirmLoading,
                  }}
                  okText="Yes"
                  cancelText="No"
                  onCancel={handleCancel}
                >
                  <a onClick={showPopconfirm}>Cancel Plan</a>
                </Popconfirm>
              ) : (
                <a onClick={() => createSession(price.id)}>Buy Now</a>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Subscription;
