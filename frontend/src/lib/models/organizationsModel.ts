/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';
import { BACKEND_URL } from '../../config/backend/backend';

export default class OrganizationsModel {
  public static joinOrganization = async (organizationId: number) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/join_organization`,
        { organization_id: organizationId },
        { withCredentials: true }
      );
      return res.data;
    } catch (e) {
      return null;
    }
  };
  public static leaveOrganization = async (organizationId: number) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/leave_organization`,
        { organization_id: organizationId },
        { withCredentials: true }
      );
      return res.data;
    } catch (e) {
      return null;
    }
  };
  public static getOrganizations = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/get_all_organizations`, { withCredentials: true });
      return res.data;
    } catch (e) {
      return null;
    }
  };
}
