import { useLocation } from 'react-router-dom';
import * as React from 'react';
import {
  getModuleNavigationConfig,
  type NavigationItem,
  type AppModuleKey,
} from '@/constants/navigation.constants';
import type { BreadcrumbItem } from '@/components/ui/breadcrumbs/Breadcrumbs.type';

export interface RouteMetadata {
  title?: string;
  breadcrumbs: BreadcrumbItem[];
}

function findBreadcrumbsPath(
  items: NavigationItem[],
  targetPath: string,
  parents: BreadcrumbItem[] = []
): { trail: BreadcrumbItem[]; activeTitle?: string } | null {
  for (const item of items) {
    const currentTrail: BreadcrumbItem = {
      label: item.title,
      href: item.path,
    };
    const newTrail = [...parents, currentTrail];

    if (item.path && item.path.toLowerCase() === targetPath.toLowerCase()) {
      return {
        trail: newTrail,
        activeTitle: typeof item.title === 'string' ? item.title : undefined,
      };
    }

    if (item.children && item.children.length > 0) {
      const found = findBreadcrumbsPath(item.children, targetPath, newTrail);
      if (found) return found;
    }
  }
  return null;
}

export function useRouteMetadata(moduleKey?: AppModuleKey): RouteMetadata {
  const { pathname } = useLocation();

  return React.useMemo<RouteMetadata>(() => {
    if (!moduleKey) {
      return { title: undefined, breadcrumbs: [] };
    }

    const config = getModuleNavigationConfig(moduleKey, {});
    if (!config) {
      return { title: undefined, breadcrumbs: [] };
    }

    const allItems = config.groups.flatMap((g) => g.items);
    const result = findBreadcrumbsPath(allItems, pathname);

    const rootBreadcrumb: BreadcrumbItem = {
      label: config.title,
      href: undefined,
    };

    const fullBreadcrumbs: BreadcrumbItem[] = [
      rootBreadcrumb,
      ...(result?.trail ?? []),
    ];

    const currentTitle =
      result?.activeTitle ??
      (typeof config.title === 'string' ? config.title : undefined);

    return {
      title: currentTitle,
      breadcrumbs: fullBreadcrumbs,
    };
  }, [moduleKey, pathname]);
}

export default useRouteMetadata;
