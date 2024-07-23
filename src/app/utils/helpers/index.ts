import { Store } from '@ngrx/store';
import { IAppState } from '../../store';

export const heightChangeHandler = (
  elemId: string,
  method: 'add' | 'remove'
) => {
  const content = document.getElementById(elemId);

  if (content) {
    const executeMethod: Record<typeof method, void> = {
      add: content.classList.add('transition-height'),
      remove: content.classList.remove('transition-height'),
    };

    executeMethod[method];
  }
};

export const modalToggleHandler = (id: string, action: 'open' | 'close') => {
  const modal: HTMLDialogElement | null = document.getElementById(
    id
  ) as HTMLDialogElement;

  if (modal) {
    const methods: Record<typeof action, () => void> = {
      close: () => modal.close(),
      open: () => modal.showModal(),
    };

    methods[action]();
  }
};

export const hasAddedToCart = () => {
  const store = Store<IAppState>;
};
