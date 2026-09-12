const EVENT_HERO_CLASS =
  "relative w-xs shrink-0 grow-0 basis-xs pb-10 md:flex md:flex-col md:justify-center md:pb-0";

export default function EventHero() {
  return (
    <div className={EVENT_HERO_CLASS}>
      <div className="relative h-fit w-full pb-10 md:absolute md:top-0 md:left-0">
        <h1 className="font-omnes text-[57px] font-semibold text-purple-500">
          Contact us
        </h1>
        {/*eslint-disable-next-line @next/next/no-img-element
        -- Copied from header.tsx following the reason stated in there*/}
        <img
          className="absolute top-17 left-9"
          alt=""
          src="/contact/underline.svg"
          width="219"
          height="24"
        />
        {/*eslint-disable-next-line @next/next/no-img-element
        -- Read Above*/}
        <img
          className="absolute top-2 right-0"
          alt=""
          src="/contact/highlight.svg"
          width="36"
          height="29"
        />
      </div>
      <div className="flex justify-center">
        {/*eslint-disable-next-line @next/next/no-img-element
        -- Read Above*/}
        <img src="/contact/heart.svg" alt="" width="224" height="152" />
      </div>
    </div>
  );
}
