import * as groupRepo from "../repositories/groupRepository";
import { Group } from "../models/Group";

export async function getAllGroups(): Promise<Group[]> {
    return groupRepo.getAllGroups();
}