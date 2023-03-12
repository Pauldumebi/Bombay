interface PropTypes {
    children: JSX.Element;
}

const Index = ({ children }: PropTypes) => {
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">{children}</div>
            </div>
            <div className="opacity-30 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default Index;
