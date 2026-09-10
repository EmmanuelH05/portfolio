import DrawRule from './motion/DrawRule';

/** The centered serif headings on the home page, with the rule that draws out underneath. */
export default function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-[30px] mt-20 text-center sm:mt-[68px]">
      <h2 className="font-serif text-[36px] font-normal leading-tight tracking-[-0.01em] sm:text-[44px]">{children}</h2>
      <DrawRule />
    </div>
  );
}
