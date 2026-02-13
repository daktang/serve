# _ AAAAA....FFFF...CCC _ 구조임을 우선 확인.
# 처음과 시작은 A~F 중 아무거나 와도 되지만 A가 시작이고 C가 마지막인 부분까지 계속 잘라내야 한다.
# 슬라이스를 이용하는게 중요한 문제.

T = int(input())

for _ in range(T):
    S = input()

    # 1. 길이에 대한 조건 제거
    if len(S) < 3:
        print('Good')
        continue

    # 2. 시작이 A가 아닌 것에 대한 조건 제거 & A~F에 속하기 않는 것에 대한 제거.
    if S[0] != 'A':
        if S[0] not in {'A', 'B', 'C', 'D', 'E', 'F'}:
            print('Good')
            continue
        # A 시작이 아닌 것에 대해서 A가 나올 때 까지 잘라내버리기
        S = S[1:]

    # 3. 마지막이 C가 아닌 것에 대한 조건 제거 & A~F에 속하지 않는 것에 대한 제거.
    if S[-1] != 'C':
        if S[-1] not in {'A', 'B', 'C', 'D', 'E', 'F'}:
            print('Good')
            continue
        # C가 아닌 것에 대해서 C가 나올 때 까지 잘라내 버리기
        S = S[:-1]

    # 남은 것은 시작이 A인 것들.
    T = ""
    for i in range(len(S)):
        # 중복 연결되는 문자열을 줄여버리는 방법
        if i == 0 or S[i] != S[i - 1]:
            T += S[i]

    if T == "AFC":
        print("Infected!")
    else:
        print("Good")
