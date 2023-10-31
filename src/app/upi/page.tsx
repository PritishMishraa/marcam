"use client";

import { Drawer } from "vaul";
import { useState } from "react";
import OtpInput from "react-otp-input";
import Balancer from "react-wrap-balancer";
import { MoveLeft, MoveRight } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const screens = [Screen1, Screen2, Screen3];

export default function UPIPayment() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [transactionNumber, setTransactionNumber] = useState("");

  console.log("Transaction Number: ", transactionNumber);

  function getProgress() {
    return (currentScreen / (screens.length - 1)) * 100;
  }

  const handleNextScreen = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handlePrevScreen = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const CurrentScreenComponent = screens[currentScreen];
  {
    console.log("Drawer Rendered \n");
  }
  return (
    <div className="relative">
      <div className="max-w-2xl mx-auto text-center pt-64">
        <div className="flex flex-col relative px-1">
          <h1 className="text-7xl font-semibold mb-4 relative">UPI to UPI</h1>
          <Balancer className="text-gray-600 text-xl">
            Perfect for unregistered small business
          </Balancer>
        </div>
        <div className="flex gap-4 justify-center mt-6">
          <Drawer.Root shouldScaleBackground>
            <Drawer.Trigger asChild>
              <button
                type="button"
                className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Start Transaction
              </button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/60" />
              <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 md:max-h-[75%] max-h-[55%] fixed bottom-0 left-0 right-0">
                <div className="p-4 bg-white rounded-t-[10px] flex-1 md:overflow-hidden overflow-auto">
                  <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
                  <div className="flex flex-col max-w-2xl mx-auto h-full">
                    <Progress
                      className="mb-2 min-h-[0.5rem]"
                      value={getProgress()}
                    />
                    <CurrentScreenComponent
                      transactionNumber={transactionNumber}
                      setTransactionNumber={setTransactionNumber}
                      handleNextScreen={handleNextScreen}
                      handlePrevScreen={handlePrevScreen}
                    >
                      <div className="flex justify-between my-4">
                        <Button
                          variant="outline"
                          className="text-gray-600"
                          onClick={handlePrevScreen}
                        >
                          <MoveLeft />
                        </Button>
                        <Button
                          variant="outline"
                          className="text-gray-600"
                          onClick={handleNextScreen}
                        >
                          <MoveRight />
                        </Button>
                      </div>
                    </CurrentScreenComponent>
                  </div>
                </div>
                <div className="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
                  <div className="flex gap-6 justify-center max-w-md mx-auto">
                    <p className="text-xs text-gray-600 flex items-center">
                      Powered by &nbsp;
                      <span className="underline tracking-widest">
                        UPItoUPI.com
                      </span>
                    </p>
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </div>
    </div>
  );
}

function Screen1({
  children,
  handleNextScreen,
}: {
  children?: React.ReactNode;
  handleNextScreen: () => void;
}) {
  console.log("Screen1 Rendered \n");
  return (
    <div className="grow">
      <Drawer.Title className="flex text-gray-800 text-lg font-extrabold gap-2 mb-4">
        1. Make Payment
      </Drawer.Title>
      <div className="flex flex-col md:flex-row items-center lg:items-start justify-evenly gap-6 mt-8">
        <img
          src="/upi.png"
          alt="UPI QR Code"
          className="p-2 rounded-2xl border-4 h-56 w-56 border-gray-600"
        />
        <div className="flex flex-col gap-2 text-justify md:w-1/2 md:p-0 p-4">
          <p className="text-gray-600">
            <span className="font-bold">Scan the QR Code</span> with any UPI
            apps like{" "}
            <span className="font-bold">BHIM, Paytm, Google Pay, PhonePe</span>{" "}
            or any Banking UPI app to make payment for this order.
          </p>
          <p className="text-gray-600">
            After successful payment, enter the UPI Reference ID or Transaction
            Number in the next screen and submit the form.
          </p>
          {/* <p className="text-gray-600">
            We will manually verify this payment against your 12-digits UPI
            Reference ID or Transaction Number starts with 1 (e.g. 101422121258)
            and your UPI ID.
          </p> */}
          <Button onClick={handleNextScreen} className="w-full">
            {" "}
            Done{" "}
          </Button>
          {/* <div className="flex w-full justify-center">
          </div> */}
        </div>
      </div>
      {children}
    </div>
  );
}

function Screen2({
  children,
  transactionNumber,
  setTransactionNumber,
  handleNextScreen,
}: {
  children?: React.ReactNode;
  transactionNumber: string;
  setTransactionNumber: (otp: string) => void;
  handleNextScreen: () => void;
}) {
  console.log("Screen2 Rendered \n");
  return (
    <div className="grow">
      <Drawer.Title className="flex text-gray-800 text-lg font-extrabold gap-2 mb-4">
        2. UPI Reference ID or Transaction Number
      </Drawer.Title>
      <div className="flex flex-col md:flex-row items-center lg:items-start justify-evenly gap-6 mt-8">
        <div className="px-4 mx-auto w-full md:hidden">
          <Input
            placeholder="123456789000"
            className="w-full text-2xl font-semibold"
            autoFocus={true}
            type="number"
            value={transactionNumber}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (inputValue.length <= 12) {
                setTransactionNumber(inputValue);
              }
            }}
          />
        </div>
        <div className="hidden md:block">
          <OtpInput
            shouldAutoFocus={true}
            skipDefaultStyles={true}
            containerStyle="!grid grid-cols-4 gap-2 max-w-sm min-w-fit w-fit h-fit justify-items-center"
            inputStyle="w-12 h-12 text-2xl text-center rounded-lg border-2 border-gray-400"
            inputType="number"
            value={transactionNumber}
            onChange={setTransactionNumber}
            numInputs={12}
            renderInput={(props) => <Input {...props} />}
          />
        </div>
        <div className="flex flex-col gap-2 text-justify md:w-1/2 md:p-0 p-4">
          <p className="font-bold text-gray-600">
            Where can I find UPI Reference ID or Transaction Number?
          </p>
          <p className="text-gray-600">
            Check the transaction details in your UPI app. You will find the UPI
            Reference ID or Transaction Number in the transaction details.
          </p>
        </div>
      </div>
      <div className="flex w-full justify-center mt-6">
        <Button onClick={handleNextScreen} className="max-w-xs w-full">
          {" "}
          Done{" "}
        </Button>
      </div>
      {children}
    </div>
  );
}

function Screen3({
  children,
  transactionNumber,
  handleNextScreen,
  handlePrevScreen,
}: {
  children?: React.ReactNode;
  transactionNumber: string;
  handleNextScreen: () => void;
  handlePrevScreen: () => void;
}) {
  console.log("Screen3 Rendered \n");
  return (
    <div className="grow">
      <Drawer.Title className="flex text-gray-800 text-lg font-extrabold gap-2 mb-4">
        3. Confirmation
      </Drawer.Title>
      <div className="flex flex-col items-center lg:items-start justify-evenly gap-6 mt-8 mx-4">
        <Card className="bg-red-100">
          <CardContent className="pt-6">
            <p className="text-gray-800 font-bold text-justify">
              Are you sure that you made a payment of{" "}
              <span className="font-extrabold underline">₹1000</span> through
              UPI having Transaction Number{" "}
              <span className="font-extrabold underline">
                {transactionNumber}
              </span>
              ?
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col items-center w-full justify-center gap-2 mt-8">
        <Button onClick={handleNextScreen} className="max-w-xs w-full">
          {" "}
          Yes{" "}
        </Button>
        <Button
          onClick={handlePrevScreen}
          variant="outline"
          className="max-w-xs w-full"
        >
          {" "}
          Go Back{" "}
        </Button>
      </div>
      {children}
    </div>
  );
}
