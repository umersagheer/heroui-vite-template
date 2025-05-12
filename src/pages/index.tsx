import { useIllustration } from "@/libs/hooks/useIllustration";

export default function IndexPage() {
  const conversationIllustration = useIllustration("conversation");
  const vrIllustration = useIllustration("vr");
  const aiIllustration = useIllustration("ai");
  return (
    <section>
      <div className="container mx-auto max-w-7xl px-6 flex md:flex-row flex-col justify-around items-center gap-5">
        <div className="">
          <h2 className="md:text-5xl text-3xl font-bold max-w-xl leading-snug">
            Step into
            <span className="text-secondary-500"> CloneVerse - Talk</span> to
            Anyone, Even Yourself.
          </h2>
          <p className="max-w-xl">
            CloneVerse lets you create intelligent AI versions of yourself, your
            mentors, or even your favorite celebrities. Train clones with
            knowledge, personality, and voice — then chat, learn, and explore
            conversations like never before. It's your universe of infinite
            minds.
          </p>
        </div>
        <div className="items-center justify-center max-w-xl grid grid-cols-2 gap-4">
          <img
            src={conversationIllustration}
            alt="hero illustration"
            className="object-cover rounded-lg"
          />
          <img
            src={aiIllustration}
            alt="hero illustration"
            className="object-cover rounded-lg"
          />
          <div className="col-span-2 flex justify-center">
            <img
              src={vrIllustration}
              alt="hero illustration"
              className="object-cover rounded-lg w-1/2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
