import React from 'react';

import {
  Divider,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';

import WeatherUserControls from '../components/weather/WeatherUserControls';
import { WeatherStore } from '../store/weatherStore';
import { NewsStore } from '../store/newsStore';
import NewsSettings from '../components/news/NewsSettings';

interface Props {
  weatherStore: WeatherStore;
  newsStore: NewsStore;
  isOpen: boolean;
  onClose: () => void;
}
interface State {}

export default class Settings extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  override componentDidMount() {}

  override render() {
    const { isOpen, onClose } = this.props;

    return (
      <Modal
        open={isOpen}
        //   onClose={onClose}
      >
        <Paper>
          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', alignItems: 'start' }}
          >
            <Stack spacing={2}>
              {this.renderWeatherSettings()}
              {this.renderNewsSettings()}
            </Stack>
            <IconButton onClick={() => onClose()}>
              <Close />
            </IconButton>
          </Stack>
        </Paper>
      </Modal>
    );
  }

  private renderWeatherSettings() {
    const { weatherStore } = this.props;

    return (
      <Stack spacing={1}>
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          Weather Settings
        </Typography>
        <Divider />
        <WeatherUserControls store={weatherStore} />
      </Stack>
    );
  }

  private renderNewsSettings() {
    const { newsStore } = this.props;

    return (
      <Stack spacing={1}>
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          News Settings
        </Typography>
        <Divider />
        <NewsSettings store={newsStore} />
      </Stack>
    );
  }
}
