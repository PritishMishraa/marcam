/**
 * Credits: Fast Nguyen
 * Blog Link: https://fastnguyen.medium.com/build-otp-input-with-reactjs-hooks-5699eb58b427
 * Github Link: https://github.com/phatnguyenuit/react-otp-input-scratch
 */

"use client";

import usePrevious from "@/hooks/usePrevious";
import React, { memo, useRef, useLayoutEffect } from "react";
import { Input } from "../ui/input";

export interface SingleOTPInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  focus?: boolean;
}

export function SingleOTPInputComponent(props: SingleOTPInputProps) {
  const { focus, autoFocus, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocus = usePrevious(!!focus);
  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return <Input ref={inputRef} {...rest} />;
}

const SingleOTPInput = memo(SingleOTPInputComponent);
export default SingleOTPInput;
