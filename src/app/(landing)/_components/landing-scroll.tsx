"use client";
import React from "react";
import Image from "next/image";
import { ScrollAnimation } from "@/components/annimation/scroll-animation";
import { TextGradient } from "@/components/common/text-gradient";

export function LandingScrollSection() {
  return (
    <section className="flex flex-col overflow-hidden">
      <ScrollAnimation
        titleComponent={
          <>
            <TextGradient
              element="H1"
              className="text-2xl md:text-3xl lg:text-5xl"
            >
              EduVerse: Your Gateway to Knowledge.
              <p className="text-lg font-normal pt-3">
                EduVerse is a comprehensive learning management system designed
                to revolutionize the way you learn and teach. With a
                user-friendly interface and powerful features, EduVerse empowers
                educators to create engaging courses and track student progress
                seamlessly.
              </p>
            </TextGradient>
          </>
        }
      >
        <Image
          src={`/landing-snippet.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ScrollAnimation>
    </section>
  );
}
