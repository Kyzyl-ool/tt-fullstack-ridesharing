/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';

export default class OrganizationsModel {
  public static joinOrganization = async (organizationId: number) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/join_organization',
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
        'http://localhost:5000/leave_organization',
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
      const res = await axios.get('http://localhost:5000/get_all_organizations', { withCredentials: true });
      return res.data;
    } catch (e) {
      return null;
    }
  };
}
