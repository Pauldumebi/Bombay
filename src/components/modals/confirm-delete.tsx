import { ModalStatePropTypes } from "types/modal-state";
import ModalBackdrop from "components/modals";
import CustomSpinner from "components/custom-spinner";

interface PropTypes extends ModalStatePropTypes {
    deleteConfirmed: () => void;
    loading: boolean;
}

const Modal = ({ showModal, setShowModal, deleteConfirmed, loading }: PropTypes) => {
    return (
        <>
            {showModal ? (
                <>
                    <ModalBackdrop>
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold">Confirm Delete</h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>

                            <div className="relative p-6 flex-auto">
                                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                    Are you sure you want to delete this?
                                </p>
                            </div>
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    No
                                </button>
                                <button
                                    className="bg-[var(--button-color)] hover:bg-[var(--blue)] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-white"
                                    type="button"
                                    onClick={deleteConfirmed}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <CustomSpinner height="1.3rem" width="3rem" />
                                    ) : (
                                        "Yes"
                                    )}
                                </button>
                            </div>
                        </div>
                    </ModalBackdrop>
                </>
            ) : null}
        </>
    );
};

export default Modal;
