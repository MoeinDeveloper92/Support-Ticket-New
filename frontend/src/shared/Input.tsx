import React from 'react';

interface IProps<T extends React.ElementType> {
  as?: T;
  className?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  type?: string;
}

const Input = <T extends React.ElementType = 'input'>({
  as,
  ...props
}: IProps<T> & React.ComponentPropsWithoutRef<T>) => {
  const Component = as || 'input';
  return <Component {...props} />;
};

export default Input;
