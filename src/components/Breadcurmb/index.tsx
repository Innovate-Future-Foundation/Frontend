import { matchPath, useLocation } from "react-router-dom";

import { Breadcrumb as CNBreadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  breadcrumbs: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbs }) => {
  const location = useLocation();
  return (
    <CNBreadcrumb>
      <BreadcrumbList className="capitalize">
        {breadcrumbs.map(breadcrumb => {
          const isMatch = matchPath(breadcrumb.href, location.pathname) || location.pathname.startsWith(breadcrumb.href);
          return (
            isMatch && (
              <div className="flex" key={breadcrumb.href}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.label}</BreadcrumbLink>
                </BreadcrumbItem>
              </div>
            )
          );
        })}
      </BreadcrumbList>
    </CNBreadcrumb>
  );
};
export default Breadcrumb;
