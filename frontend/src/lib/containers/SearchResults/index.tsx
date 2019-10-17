import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { ISearchItem } from '../../../net/interfaces/ISearchItem';
import { SearchResultItem } from '../../components/SearchResultItem/SearchResultItem';

interface ISearchResultsProps {
  data?: ISearchItem[];
  buttonState: boolean;
  onClick: () => any;
}

export const SearchResults: React.FC<ISearchResultsProps> = props => {
  if (props.data) {
    return (
      <div>
        {props.data.map((value, index) => (
          <SearchResultItem key={index} {...value} />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        {!props.buttonState ? (
          <Typography variant={'body1'} color={'textSecondary'}>
            Введите данные о поездке
          </Typography>
        ) : (
          <Button onClick={props.onClick} variant={'contained'}>
            Поиск
          </Button>
        )}
      </div>
    );
  }
};
