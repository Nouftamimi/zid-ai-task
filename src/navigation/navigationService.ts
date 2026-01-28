import { router } from 'expo-router';

type NavigationAction = 'push' | 'replace' | 'reset';

type NavigateOptions = {
  action?: NavigationAction;
};

export function navigate(
  route: any,
  options: NavigateOptions = { action: 'push' }
) {
  const { action } = options;

  switch (action) {
    case 'replace':
      router.replace(route);
      break;

    case 'reset':
      router.replace(route); 
      break;

    default:
      router.push(route);
  }
}
