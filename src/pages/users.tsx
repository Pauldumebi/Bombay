import { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { reformData, useFetchUsers } from "services/swr/user";
import AddUser from "../components/modals/add-user";
import EditUser from "../components/modals/edit-user";
import { showToast } from "utils/showToast";
import useAxios from "hooks/use-axios";
import urls from "services/axios/urls";
import ConfirmDelete from "components/modals/confirm-delete";
import CustomSpinner from "components/custom-spinner";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import Summary from "components/summary";

export interface TableRow {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    address: string;
}

const Users = () => {
    const [user, setUser] = useState<TableRow>();
    const [openAddUser, setOpenAddUser] = useState<boolean>(false);
    const [openEditUser, setOpenEditUser] = useState<boolean>(false);
    const { makeRequest, loading } = useAxios();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [userId, setUserId] = useState("");
    const { data, mutate, isGenerating } = useFetchUsers();
    const users = reformData(data);

    const deleteConfirmed = () => {
        deleteUser(userId);
    };

    const deleteUser = async (id: string) => {
        const result = await makeRequest({
            url: urls.deleteUserUrl(id),
            method: "delete",
        });

        if (result.status === "success") {
            mutate(urls.fetchUsersUrl);
        }
        setShowModal(false);
        return showToast({
            message:
                result.status === "success" ? `User deleted successfully` : String(result.error),
            type: result.status,
        });
    };

    const columns: TableColumn<TableRow>[] = [
        {
            name: "First Name",
            selector: row => row.firstname,
        },
        {
            name: "Last Name",
            selector: row => row.lastname,
        },
        {
            name: "Email",
            selector: row => row.email,
        },
        {
            name: "Address",
            selector: row => row.address,
        },
        {
            name: "Actions",
            cell: row => {
                return (
                    <div className="flex alignItems-center gap-[10px]">
                        <button
                            onClick={() => {
                                setUser(row);
                                setOpenEditUser(true);
                            }}
                        >
                            <FaEdit />
                        </button>
                        <button
                            onClick={() => {
                                setShowModal(true);
                                setUserId(row._id);
                            }}
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
            <Summary path="Users" count={users?.length} />
            <div className="flex justify-end mx-2">
                <button
                    className="btn bg-[var(--button-color)] hover:bg-[var(--blue)] text-white font-semibold px-4 py-2 mb-4 rounded-md"
                    onClick={() => {
                        setOpenAddUser(true);
                    }}
                >
                    Add User
                </button>
            </div>

            <ConfirmDelete
                showModal={showModal}
                setShowModal={setShowModal}
                deleteConfirmed={deleteConfirmed}
                loading={loading}
            />
            <DataTable
                columns={columns}
                data={users!}
                progressComponent={<CustomSpinner />}
                progressPending={isGenerating}
                pagination
            />
            <AddUser showModal={openAddUser} setShowModal={setOpenAddUser} />
            <EditUser showModal={openEditUser} setShowModal={setOpenEditUser} user={user!} />
        </>
    );
};

export default Users;
