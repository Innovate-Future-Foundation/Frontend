import { Profile, ProfileInfo, RoleType, TableBaseType } from "@/types";
import { faker } from "@faker-js/faker";
import { newOrganisation } from "./mockOrganisation";

export const newProfile = (role?: RoleType): TableBaseType<Profile> => {
  const roleName = role ?? faker.helpers.shuffle<RoleType>(["organisation manager", "organisation admin", "organisation teacher", "parent", "student"])[0];
  return {
    profileId: faker.string.uuid(),
    org: newOrganisation(),
    role: roleName,
    inviter: roleName === "organisation admin" ? null : newProfileInfo(),
    supervisor: roleName != "student" ? null : newProfileInfo("parent"),
    name: faker.person.fullName(),
    email: `${faker.person.fullName()}@gmail.com`,
    phone: faker.helpers.shuffle([`+61 45${faker.number.int({ min: 1000000, max: 9999999 })}`, null])[0],
    avatarUrl: faker.helpers.shuffle([faker.image.avatar(), null])[0],
    isActive: faker.helpers.shuffle<boolean>([true, false])[0],
    isConfirmed: faker.helpers.shuffle<boolean>([true, false])[0],
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString()
  };
};

export const newProfileInfo = (role?: RoleType): TableBaseType<ProfileInfo> => {
  const roleName = role ?? faker.helpers.shuffle<RoleType>(["platform admin", "organisation manager", "organisation admin", "organisation teacher"])[0];

  return {
    role: roleName,
    name: faker.person.fullName(),
    email: `${faker.person.fullName()}@gmail.com`,
    phone: faker.helpers.shuffle([`+61 45${faker.number.int({ min: 1000000, max: 9999999 })}`, null])[0],
    avatarUrl: faker.helpers.shuffle([faker.image.avatar(), null])[0],
    isActive: faker.helpers.shuffle<boolean>([true, false])[0],
    isConfirmed: faker.helpers.shuffle<boolean>([true, false])[0]
  };
};
