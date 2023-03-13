import CustomSelect from "components/custom-select";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import moment from "moment";
import AddGame from "../components/modals/add-game";
import EditGame from "../components/modals/edit-game";
import useAxios from "hooks/use-axios";
import urls from "services/axios/urls";
import { showToast } from "utils/showToast";
import { reformData, useFetchGames } from "services/swr/game";
import { GameReqParams } from "services/axios/game";
import useStateWithCallback from "use-state-with-callback";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import CustomSpinner from "components/custom-spinner";
import { DatePicker } from "antd";
import ConfirmDelete from "components/modals/confirm-delete";
import { useFetchCategories } from "services/swr/user";
import Summary from "components/summary";

export interface TableRow {
    _id: string;
    name: string;
    category: string;
    createdAt: Date;
}

const Games = () => {

    const [game, setGame] = useState<TableRow>();
    const [openAddGame, setOpenAddGame] = useState(false);
    const [openEditGame, setOpenEditGame] = useState(false);
    const { RangePicker } = DatePicker;
    const { makeRequest, loading } = useAxios();
    const [gameId, setGameId] = useState("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [params, setParams] = useStateWithCallback<GameReqParams>(
        {
            category: "",
            createdAt: "",
            startDate: "",
            endDate: "",
        },
        () => {
            mutate();
        }
    );
    const { data, mutate, isGenerating } = useFetchGames(params);
    const games = reformData(data);

    useEffect(() => {
        localStorage.setItem("games-total", games.length.toString());
    }, [games]);

    const deleteConfirmed = () => {
        deleteGame(gameId);
    };
    const deleteGame = async (id: string) => {
        const result = await makeRequest({
            url: urls.deleteGameUrl(id),
            method: "delete",
        });

        if (result.status === "success") {
            mutate(urls.fetchGamesUrl);
            mutate(urls.fetchGameCategories);
        }
        setShowModal(false);
        return showToast({
            message:
                result.status === "success"
                    ? result.message ?? "Game deleted successfully"
                    : String(result.error),
            type: result.status,
        });
    };

    const getSelectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setParams({ category: e.target.value });
    };

    const handleSelect = (date: any, dateString: string[]) => {
        setParams({ startDate: dateString[0], endDate: dateString[1], createdAt: "" });
    };

    const { data: gameCategory, isGenerating: isLoading } = useFetchCategories();

    const columns: TableColumn<TableRow>[] = [
        {
            name: "Name",
            selector: row => row.name,
        },
        {
            name: "Category",
            selector: row => row.category,
        },
        {
            name: "Creation Date",
            selector: row => moment(row.createdAt).format("DD/MM/YYYY"),
        },
        {
            name: "Actions",
            cell: row => {
                return (
                    <div className="flex alignItems-center gap-[10px]">
                        <button
                            onClick={() => {
                                setGame(row);
                                setOpenEditGame(true);
                            }}
                        >
                            <FaEdit />
                        </button>
                        <button
                            onClick={
                                () => {
                                    setShowModal(true);
                                    setGameId(row._id);
                                }
                            }
                        >
                            <AiTwotoneDelete />
                        </button>
                    </div>
                );
            },
        },
    ];
    return (
        <>
            <Summary path="Games" count={games?.length}/>
            <div className="w-full items-center">
                <div className="flex justify-between flex-wrap mb-4">
                    {!isGenerating && (
                        <>
                            <CustomSelect
                                label="Select a category"
                                isLoading={isLoading}
                                options={Array.from(new Set(["All", ...gameCategory]))}
                                getSelectValue={getSelectValue}
                            />

                            <div>
                                <p className="pb-2">Select a date</p>
                                <DatePicker
                                    onChange={(date, dateString) =>
                                        setParams({
                                            createdAt: dateString,
                                            startDate: "",
                                            endDate: "",
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <p className="pb-2">Select a date range</p>
                                <RangePicker onChange={handleSelect} />
                            </div>
                        </>
                    )}
                    <button
                        onClick={() => setOpenAddGame(true)}
                        className="btn bg-[var(--button-color)] hover:bg-[var(--blue)] text-white font-semibold px-4 py-2 mb-4 mt-4 rounded-md"
                    >
                        Add Game
                    </button>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={games}
                progressComponent={<CustomSpinner />}
                progressPending={isGenerating}
            />

            <ConfirmDelete
                showModal={showModal}
                setShowModal={setShowModal}
                deleteConfirmed={deleteConfirmed}
                loading={loading}
            />
            <AddGame showModal={openAddGame} setShowModal={setOpenAddGame} />
            <EditGame showModal={openEditGame} setShowModal={setOpenEditGame} game={game!} />
        </>
    );
};

export default Games;
