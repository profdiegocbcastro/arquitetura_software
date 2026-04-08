/**
 * Resolver do domínio ServiceInfo.
 */
export function createServiceInfoResolver({ serviceInfoService }) {
  return {
    Query: {
      serviceInfo: () => {
        return serviceInfoService.getServiceInfo();
      },
    },
  };
}
