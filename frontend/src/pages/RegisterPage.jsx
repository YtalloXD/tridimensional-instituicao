import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Alert,
  Link,
} from '@mui/material';
import logoCompleto from './../assets/logo-completo.png'; 

const RegisterPage = ({ onRegisterSuccess, onGoToLogin }) => {
  const [tipo, setTipo] = useState('ALUNO');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [turmaId, setTurmaId] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    let body = { email, senha, tipo, nome };

    if (tipo === 'ALUNO') {
      if (!idade || !turmaId) {
        setError('Por favor, preencha todos os campos obrigatórios.');
        setLoading(false);
        return;
      }
      body.idade = parseInt(idade, 10);
      body.turma_id = parseInt(turmaId, 10);
    } else {
      if (!especialidade) {
        setError('Por favor, preencha todos os campos obrigatórios.');
        setLoading(false);
        return;
      }
      body.especialidade = especialidade;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json(); 
      if (!response.ok) {
        throw new Error(data.error || 'Ocorreu um erro no registro.');
      }
      setSuccess('Registro feito com sucesso! Você será redirecionado.');
      
      setTimeout(() => onRegisterSuccess(data), 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#4A148C',
        display: 'flex',
        alignItems: 'flex-start', 
        justifyContent: 'center',
        overflowY: 'auto',
        py: 5,
        px: 2,
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 2,
            padding: { xs: 2, sm: 3 }, 
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          <img 
            src={logoCompleto} 
            alt="Logo Tridimensional" 
            style={{ width: '150px', marginBottom: '0.5rem' }} 
          />
          

          <Typography 
            component="h2" 
            variant="h6" 
            sx={{ 
              mt: 1, 
              mb: 1, 
              textAlign: 'center', 
              fontWeight: 'normal' 
            }}
          >
            Crie sua Conta
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <FormControl component="fieldset" fullWidth margin="dense">
              <FormLabel component="legend">Eu sou</FormLabel>
              <RadioGroup row value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <FormControlLabel value="ALUNO" control={<Radio />} label="Aluno" />
                <FormControlLabel value="PROFESSOR" control={<Radio />} label="Professor" />
              </RadioGroup>
            </FormControl>

            <TextField margin="dense" required fullWidth id="nome" label="Nome Completo" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            <TextField margin="dense" required fullWidth id="email" label="Endereço de Email" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField margin="dense" required fullWidth name="password" label="Senha" type="password" id="password" autoComplete="new-password" value={senha} onChange={(e) => setSenha(e.target.value)} />

            {tipo === 'ALUNO' && (
              <>
                <TextField margin="dense" required fullWidth name="idade" label="Idade" type="number" id="idade" value={idade} onChange={(e) => setIdade(e.target.value)} />
                <TextField margin="dense" required fullWidth name="turma_id" label="ID da Turma" type="number" id="turma_id" helperText="Pergunte ao administrador o ID da sua turma." value={turmaId} onChange={(e) => setTurmaId(e.target.value)} />
              </>
            )}

            {tipo === 'PROFESSOR' && (
              <TextField margin="dense" required fullWidth name="especialidade" label="Especialidade" type="text" id="especialidade" value={especialidade} onChange={(e) => setEspecialidade(e.target.value)} />
            )}

            {error && (<Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>)}
            {success && (<Alert severity="success" sx={{ mt: 2, width: '100%' }}>{success}</Alert>)}

            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              sx={{ mt: 2.5, mb: 2, py: 1.5, fontSize: '1rem' }} 
              disabled={loading}
            >
              {loading ? (<CircularProgress size={24} color="inherit" />) : ('Registrar')}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Já tem uma conta?{' '}
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={onGoToLogin}
                  sx={{
                    color: 'primary.main',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    '&:hover': {
                      color: 'primary.dark',
                    },
                  }}
                >
                  Entre aqui
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage;