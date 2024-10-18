/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FormInputText } from '../../components/controller/controllerInputText';
import { post } from '../../service/request';
import useTokenStore from '../../store/tokenStore';
import useLoadingStore from '../../store/loadingStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().required('Required field!'),
  passWord: yup.string().required('Required field!'),
});

const defaultValues = { email: '', passWord: '' };

const LoginPage = () => {
  const { token, setToken } = useTokenStore();
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  const loginMutation = useMutation({
    mutationFn: (formData) => {
      setIsLoading(true);
      return post({
        url: '/authenticate',
        data: formData,
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess: (data) => {
      setToken(data.token);
    },
  });

  const { handleSubmit, control } = useForm<any>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (value: any) => {
    loginMutation.mutate(value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '5px',
          flexDirection: 'column',
          width: '300px',
          height: 'fit-content',
          backgroundColor: '#fff',
          borderRadius: '5px',
          padding: '20px',
        }}
      >
        <Typography sx={{ margin: '0 auto 20px' }} variant='h4'>
          Login
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginBottom: '10px',
          }}
        >
          <FormInputText name='email' control={control} label='Email' />
          <FormInputText
            name='passWord'
            type='password'
            control={control}
            label='Mật khẩu'
          />
        </Box>
        <Button
          onClick={handleSubmit(onSubmit)}
          children='Login'
          type='submit'
          variant='contained'
          color='primary'
        />
      </Box>
    </Box>
  );
};

export default LoginPage;
