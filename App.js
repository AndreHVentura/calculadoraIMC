import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');
  const [cor, setCor] = useState('');
  const [erro, setErro] = useState('');

  const calcularIMC = () => {
    const p = parseFloat(peso);
    const a = parseFloat(altura);

    if (isNaN(p) || isNaN(a) || a <= 0) {
      setErro('⚠️ Preencha corretamente o peso e a altura!');
      setImc(null);
      setClassificacao('');
      return;
    }

    setErro('');
    const resultado = (p / (a * a)).toFixed(2);
    setImc(resultado);
    definirClassificacao(resultado);
  };

  const definirClassificacao = (valor) => {
    const v = parseFloat(valor);

    if (v < 18.5) {
      setClassificacao('Abaixo do Peso');
      setCor('#F4D03F');
    } else if (v >= 18.5 && v <= 24.9) {
      setClassificacao('Peso Normal');
      setCor('#2ECC71');
    } else if (v >= 25 && v <= 29.9) {
      setClassificacao('Sobrepeso');
      setCor('#F1C40F');
    } else if (v >= 30 && v <= 34.9) {
      setClassificacao('Obesidade Grau I');
      setCor('#E67E22');
    } else if (v >= 35 && v <= 39.9) {
      setClassificacao('Obesidade Grau II');
      setCor('#E74C3C');
    } else {
      setClassificacao('Obesidade Grau III');
      setCor('#C0392B');
    }
  };

  const limpar = () => {
    setPeso('');
    setAltura('');
    setImc(null);
    setClassificacao('');
    setErro('');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>💪 Calculadora de IMC</Text>

        <TextInput
          style={styles.input}
          placeholder="Peso (kg)"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />
        <TextInput
          style={styles.input}
          placeholder="Altura (m)"
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
        />

        <TouchableOpacity style={styles.button} onPress={calcularIMC}>
          <Text style={styles.buttonText}>Calcular IMC</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={limpar}>
          <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>

        {erro ? <Text style={styles.error}>{erro}</Text> : null}

        {imc && (
          <View style={[styles.resultCard, { borderColor: cor }]}>
            <Text style={styles.resultText}>IMC: {imc}</Text>
            <Text style={[styles.classificacao, { color: cor }]}>
              {classificacao}
            </Text>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAF2F8',
    padding: 20,
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#FDFEFE',
  },
  button: {
    backgroundColor: '#3498DB',
    width: '80%',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  clearButton: {
    backgroundColor: '#7F8C8D',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultCard: {
    borderWidth: 2,
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495E',
  },
  classificacao: {
    fontSize: 18,
    marginTop: 5,
    fontWeight: 'bold',
  },
  error: {
    fontSize: 16,
    color: '#E74C3C',
    marginTop: 10,
    textAlign: 'center',
  },
});