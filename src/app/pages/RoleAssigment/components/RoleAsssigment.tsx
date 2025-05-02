'use client';

import { useEffect, useState } from 'react';
import { FaUserCircle, FaSyncAlt } from 'react-icons/fa';
import { useGetUser, useSyncUserRole } from '@/src/app/hooks/UseUser';
import { useGetRole } from '@/src/app/hooks/useRol';
import { User } from '@/src/app/models/user';
import Loading from '@/src/app/components/Loading';
import Swal from 'sweetalert2';
import ModalPermission from '../components/ModalPermissions';
import { Breadcrumb } from 'react-bootstrap';

export default function RoleAssignmentCards() {
    const [isSpinning, setIsSpinning] = useState(false);
    const {
        data: usersData,
        isLoading: loadingUsers,
        isError: errorUsers,
        refetch: refetchUsers
    } = useGetUser();

    const {
        data: roles = [],
        isLoading: loadingRoles,
        isError: errorRoles,
        refetch: refetchRoles
    } = useGetRole();

    const { mutate: syncRole } = useSyncUserRole();

    const [users, setUsers] = useState<User[]>([]);
    interface Role {
        id: number;
        name: string;
        permissions: string[]; // Ensure permissions property is included
    }

    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (usersData) {
            setUsers(usersData);
        }
    }, [usersData]);

    const handleRoleChange = (userId: number, newRole: string) => {
        const updatedUsers = users.map((u) =>
            Number(u.id) === userId ? { ...u, role: newRole } : u
        );
        setUsers(updatedUsers);
        syncRole(
            { userId, role: newRole },
            {
                onSuccess: () => {
                    Swal.fire({
                        title: 'Éxito',
                        text: `Rol de usuario ${userId} cambiado a ${newRole}`,
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                    });
                },
                onError: () => {
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo cambiar el rol del usuario.',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                    });
                },
            }
        );
    };

    const handleRefresh = async () => {
        setIsSpinning(true);

        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'info',
            title: 'Actualizando datos...',
            showConfirmButton: false,
            timer: 1200,
        });

        try {
            await Promise.all([refetchUsers(), refetchRoles()]);
        } catch {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Error al actualizar',
                showConfirmButton: false,
                timer: 1500,
            });
            setIsSpinning(false);
            return;
        }

        setTimeout(() => {
            setIsSpinning(false);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Actualización completada',
                showConfirmButton: false,
                timer: 1500,
            });
        }, 300);
    };


    if (loadingUsers || loadingRoles) return <Loading />;

    if (errorUsers || errorRoles) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-red-500 text-lg">
                    Error al cargar los datos. Por favor, inténtalo de nuevo más tarde.
                </p>
            </div>
        );
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/pages/Dashboard">Inicio</Breadcrumb.Item>
                <Breadcrumb.Item active>Roles a asignar</Breadcrumb.Item>
            </Breadcrumb>

            {/* Header con botón actualizar */}
            <div className="flex justify-between items-center mb-4 px-1">
                <h1 className="text-xl font-semibold text-gray-800">Gestión de Roles</h1>
                <button
                    onClick={handleRefresh}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-white text-blue-600 border border-blue-500 rounded-full hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600 transition-all duration-200 ease-in-out shadow"
                >
                    <FaSyncAlt className={isSpinning ? 'animate-spin-once' : ''} />
                    Actualizar
                </button>
            </div>

            {/* Grid de usuarios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center text-center border border-gray-200"
                    >
                        <FaUserCircle className="text-4xl text-gray-500 mb-2" />
                        <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                        <p className="text-sm text-gray-500 mb-4">{user.email}</p>

                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Rol asignado
                            </label>
                            <select
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={user.role || 'Sin rol'}
                                onChange={(e) => handleRoleChange(Number(user.id), e.target.value)}
                            >
                                <option value="Sin rol">Sin rol</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.name}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>

                            {user.role && user.role !== 'Sin rol' && (
                                <button
                                    onClick={() => {
                                        const roleObj = roles.find(r => r.name === user.role);
                                        if (roleObj && roleObj.id !== undefined) {
                                            setSelectedRole({ ...roleObj, id: roleObj.id, permissions: roleObj.permissions || [] });
                                            setShowModal(true);
                                        }
                                    }}
                                    className="mt-4 px-5 py-2.5 bg-white text-blue-600 font-semibold border border-blue-500 rounded-full shadow hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transform hover:scale-[1.03] transition-all duration-200 ease-in-out"
                                >
                                    Editar permisos
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {showModal && selectedRole && (
                    <ModalPermission
                        role={selectedRole}
                        onClose={() => {
                            setShowModal(false);
                            setSelectedRole(null);
                        }}
                    />
                )}
            </div>
        </>
    );
}
