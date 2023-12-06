export default function LoginLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="flex justify-center items-center h-full w-full bg-[#F7EDE2]">
        {children}
      </section>
    </>
  );
}
