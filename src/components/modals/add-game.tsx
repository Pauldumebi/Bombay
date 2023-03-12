import { SubmitHandler, useForm } from "react-hook-form";
import useAxios from "hooks/use-axios";
import { mutate } from "swr";
import { showToast } from "utils/showToast";
import CustomSpinner from "components/custom-spinner";
import urls from "services/axios/urls";
import ModalBackdrop from "components/modals";
import { GamesForm } from "types/user-form";

interface PropTypes {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const AddGame = ({ showModal, setShowModal }: PropTypes) => {
  const { makeRequest, loading } = useAxios();
  const { register, handleSubmit, reset } = useForm<GamesForm>();

  const formSubmit : SubmitHandler<GamesForm> = async (data) => {
    const result = await makeRequest({
      url: urls.createGameUrl,
      method: "post",
      payload: data,
    });

    if (result.status === "success") {
      mutate(urls.fetchGamesUrl);
      mutate(urls.fetchGameCategories);
      setShowModal(false);
      reset();
    }

    return showToast({
      message: result.status === "success" ? `Game added successfully` : String(result.error),
      type: result.status,
    });
  };

  return (
    <>
      {showModal ? (
        <ModalBackdrop>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mt-16 mx-auto max-w-5xl sm:w-1/2 md:w-5/12">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 rounded-t ">
                  <h3 className="text-lg font-bold">Add New Game</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-4"
                        viewBox="0 0 320 512"
                      >
                        <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                      </svg>
                    </span>
                  </button>
                </div>
                <div className="relative p-4 flex-auto">
                  <form
                    className="rounded px-8 pt-6 pb-5 w-full"
                    onSubmit={handleSubmit(formSubmit)}
                  >
                    <div className="mb-1">
                      <label className="block text-black text-sm font-bold mb-1">Name</label>
                      <input
                        required
                        {...register("name")}
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      />
                    </div>
                    <div className="mb-1">
                      <label className="block text-black text-sm font-bold mb-1">Category</label>
                      <input
                        required
                        {...register("category")}
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      />
                    </div>
                    <div className="flex items-center justify-end p-6 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1"
                        type="button"
                        onClick={() => {
                          reset();
                          setShowModal(false);
                        }}
                      >
                        Close
                      </button>
                      <button
                        disabled={loading}
                        className="text-white bg-[var(--button-color)] hover:bg-[var(--blue)] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1"
                      >
                        {loading ? <CustomSpinner height="1.3rem" width="3rem" /> : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </ModalBackdrop>
      ) : null}
    </>
  );
};

export default AddGame;
