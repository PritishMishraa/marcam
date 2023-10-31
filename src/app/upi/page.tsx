"use client";

import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import { Drawer } from "vaul";
import OTPInput from "@/components/otp-input";
import { useState } from "react";
import Balancer from "react-wrap-balancer";

const screens = [Screen1, Screen2];

export default function UPIPayment() {
  const [currentScreen, setCurrentScreen] = useState(0);

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
              <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 max-h-[65%] fixed bottom-0 left-0 right-0">
                <div className="p-4 bg-white rounded-t-[10px] flex-1 overflow-auto">
                  <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
                  <div className="flex flex-col max-w-2xl mx-auto h-full">
                    <CurrentScreenComponent>
                      <div className="flex justify-between">
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
                      <span className="underline tracking-wider">
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

function Screen1({ children }: { children?: React.ReactNode }) {
  return (
    <div className="grow">
      <Drawer.Title className="flex text-gray-800 text-lg font-extrabold gap-2 mb-4">
        1. Make Payment
      </Drawer.Title>
      <div className="flex flex-col md:flex-row items-center lg:items-start justify-evenly gap-6 mt-8">
        <img
          src="/upi.png"
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
            Number and your UPI ID in the next screen and submit the form.
          </p>
          <p className="text-gray-600">
            We will manually verify this payment against your 12-digits UPI
            Reference ID or Transaction Number starts with 1 (e.g. 101422121258)
            and your UPI ID.
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Screen2({ children }: { children?: React.ReactNode }) {
  return (
    <div className="grow">
      <Drawer.Title className="flex text-gray-800 text-lg font-extrabold gap-2 mb-4">
        2. UPI Reference ID or Transaction Number
      </Drawer.Title>
      <div className="flex flex-col md:flex-row items-center lg:items-start justify-evenly gap-6 mt-8">
        <OTPInput
          autoFocus
          length={12}
          isNumberInput
          className="grid grid-cols-4 gap-2 max-w-sm min-w-fit w-fit h-fit justify-items-center"
          inputClassName="w-12 h-12 text-2xl text-center rounded-lg border-2 border-gray-400"
          onChangeOTP={(otp) => console.log("Transaction Number: ", otp)}
        />
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
        <Button className="max-w-xs w-full"> Done </Button>
      </div>
      {children}
    </div>
  );
}
