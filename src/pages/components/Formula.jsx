import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Formula = () => {
  return (
    <Wrapper>
      <section className="py-16">
        <div className="container max-w-[1320px] mx-auto px-4">
          <div className="md:px-[79px]">
            <div className="flex flex-col items-center gap-0 lg:flex-row">
              {/* content */}
              <div className="order-2 lg:order-1 flex-[0_0_auto] lg:w-[50%] px-2">
                <div className="mt-[60px] space-y-4">
                  <p className="text-base font-medium tracking-widest uppercase text-suxnix-subtitle">
                    .. Suxnix Formula ..
                  </p>
                  <h2 className="text-5xl font-semibold text-suxnix-heading">
                    Why We Chose This Formula
                  </h2>
                  <div>
                    <Link className="tg-btn">Know More</Link>
                  </div>
                </div>
              </div>
              {/* image */}
              <div className="order-1 lg:order-2 sm:w-[60%] lg:w-[50%] flex-[0_0_auto] px-2">
                <img
                  src="https://suxnix-dev.myshopify.com/cdn/shop/files/formula_img.png?v=1737136420"
                  alt="formula img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .tg-btn {
    user-select: none;
    border: medium none;
    color: white;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0;
    line-height: 1;
    margin-bottom: 0;
    padding: 18px 30px;
    text-align: center;
    text-transform: uppercase;
    touch-action: manipulation;
    vertical-align: middle;
    white-space: nowrap;
    border-radius: 25px;
    position: relative;
    background-image: linear-gradient(to right, #94be26, #65b021, #94be26);
    box-shadow: 0 8px 16px #94be2666;
    transition: all 0.4s linear;
    background-size: 200% auto;
  }

  .tg-btn:hover {
    background-position: right center;
    color: white;
    box-shadow: none;
  }
`;

export default Formula;
