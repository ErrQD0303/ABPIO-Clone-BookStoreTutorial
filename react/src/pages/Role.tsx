import React from "react";
import { UserWithPermissions } from "../types/entity";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAccessToken } from "../store/authSlice";
import { Link } from "react-router-dom";
import { PermissionChanges } from "../types/request";
import roleService from "../services/roleService";

function Role() {
  const accessToken = useSelector(getAccessToken);
  const { users } = useLoaderData() as {
    users: Array<UserWithPermissions>;
  };
  const [userPermissionChanges, setUserPermissionChanges] = React.useState<{
    [key: string]: PermissionChanges;
  }>(
    Object.fromEntries(
      users.map((user) => [
        user.id,
        {
          providerName: "U",
          providerKey: user.id,
          permissions: [],
        },
      ])
    )
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentTarget = e.currentTarget;
        const parentLi = currentTarget.closest("li");
        if (!parentLi) return;
        const userId = parentLi.dataset.id;
        if (!userId) return;

        const isGroup = currentTarget.classList.contains("group-checkbox");
        if (isGroup) {
          const parentGroup = currentTarget.closest(".group-parent");
          if (!parentGroup) return;
          const permissions = parentGroup.querySelectorAll<HTMLInputElement>(
            "input.permission-checkbox"
          );
          Array.from(permissions)
            .filter((p) => p.checked !== currentTarget.checked)
            .forEach((p) => {
              const permissionName = p.name;
              if (
                userPermissionChanges[userId]?.permissions.every(
                  (pc) => pc.name !== permissionName
                )
              ) {
                setUserPermissionChanges((prev) => {
                  const currentUser = prev[userId];
                  if (!currentUser) return prev;

                  return {
                    ...prev,
                    [userId]: {
                      ...currentUser,
                      permissions: [
                        ...currentUser.permissions,
                        {
                          name: permissionName,
                          isGranted: currentTarget.checked,
                        },
                      ],
                    },
                  };
                });
              } else
                setUserPermissionChanges((prev) => {
                  const currentUser = prev[userId];
                  if (!currentUser) return prev;

                  currentUser.permissions = currentUser.permissions.filter(
                    (pc) => pc.name !== permissionName
                  );

                  return {
                    ...prev,
                    [userId]: {
                      ...currentUser,
                    },
                  };
                });

              p.checked = currentTarget.checked;
            });
        }

        const isPermission = currentTarget.classList.contains(
          "permission-checkbox"
        );
        if (isPermission) {
          const permissionName = currentTarget.name;
          const currentUser = userPermissionChanges[userId];
          if (
            currentUser.permissions.every((pc) => pc.name !== permissionName)
          ) {
            setUserPermissionChanges((prev) => {
              const currentUserValue = prev[userId];
              return {
                ...prev,
                [userId]: {
                  ...currentUserValue,
                  permissions: [
                    ...currentUserValue.permissions,
                    {
                      name: permissionName,
                      isGranted: currentTarget.checked,
                    },
                  ],
                },
              };
            });
          } else
            setUserPermissionChanges((prev) => {
              const currentUserValue = prev[userId];
              return {
                ...prev,
                [userId]: {
                  ...currentUserValue,
                  permissions: currentUserValue.permissions.filter(
                    (p) => p.name !== permissionName
                  ),
                },
              };
            });

          const parentGroup = currentTarget.closest(".group-parent");
          if (!parentGroup) return;
          const groupCheckbox =
            parentGroup.querySelector<HTMLInputElement>(".group-checkbox");
          if (!groupCheckbox) return;
          const permissions = parentGroup.querySelectorAll<HTMLInputElement>(
            "input.permission-checkbox"
          );
          if (!permissions || !permissions.length) return;
          groupCheckbox.checked = Array.from(permissions).some(
            (p) => p.checked
          );
        }
      },
      [userPermissionChanges, setUserPermissionChanges]
    );

  const handleSave: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(() => {
      const updatePermissions = async () => {
        await Promise.all(
          Object.entries(userPermissionChanges).map(
            async ([providerKey, { providerName, permissions }]) => {
              await roleService.updatePermissions(providerName, providerKey, {
                permissions,
              });
            }
          )
        );

        alert("Permissions updated successfully");
      };

      updatePermissions();
    }, [userPermissionChanges]);

  return (
    <>
      <Link to="/">Go back to Homepage</Link>
      {accessToken ? (
        <>
          <div>Users:</div>
          <ul>
            {users.map((user) => (
              <li key={user.id} data-id={user.id}>
                <div>{user.userName}</div>
                {user.groups?.map((group) => (
                  <div className="group-parent" key={group.name}>
                    <div>
                      <input
                        type="checkbox"
                        className="group-checkbox"
                        id={`${group.name}-${user.id}`}
                        name={group.name}
                        defaultChecked={group.permissions.some(
                          (permission) => permission.isGranted
                        )}
                        onChange={handleChange}
                      />
                      <label htmlFor={`${group.name}-${user.id}`}>
                        {group.displayName}
                      </label>
                    </div>
                    <div
                      style={{
                        marginLeft: "20px",
                      }}
                    >
                      {group.permissions.map((permission) => (
                        <div key={permission.name}>
                          <input
                            type="checkbox"
                            className="permission-checkbox"
                            id={`${group.name}-${permission.name}-${user.id}`}
                            name={permission.name}
                            defaultChecked={permission.isGranted}
                            onChange={handleChange}
                          />
                          <label
                            htmlFor={`${group.name}-${permission.name}-${user.id}`}
                          >
                            {permission.displayName}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </li>
            ))}
          </ul>
          <button
            style={{
              display: "block",
              position: "fixed",
              top: "50%",
              right: "40px",
              padding: "10px",
            }}
            onClick={handleSave}
          >
            Save
          </button>
        </>
      ) : (
        <Link to="/">Please go back to homepage and login</Link>
      )}
    </>
  );
}

export default Role;
