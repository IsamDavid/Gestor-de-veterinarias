#include <bits/stdc++.h>
using namespace std;

int main(){
	int n; cin >> n;
	for(int i=0;i<n;++i) {
		int k; 
		cin >> k;
		int potencia = 1;	
		vector<int> salida;
		while (k > 0) {
			if (k % 10 > 0) {
				salida.push_back((k % 10) * potencia);
			}
			potencia *= 10;
			k /= 10;
		}
		cout << salida.size() << endl;
		for(int i=0;i<salida.size();++i)
    {
		  cout << salida[i] << " ";
		}
		cout << endl;
	}
  return 0;
}
