package test;

public class Test {
	public static void main(String[] args) throws Exception {
		Solution sol = new Solution();
		int[] a = { 1, 1, 2, 3, 4, 4, 5 };
		 System.out.println(sol.divide(Integer.MAX_VALUE, 1));
//		System.out.println(Integer.MAX_VALUE);
		// sol.print(a, 5);
//		int sum =  (Integer.MAX_VALUE - 1 + Integer.MAX_VALUE);
//		System.out.println(sum);
		
	}
}

class Solution {
	public int divide(int dividend, int divisor) {
		if (dividend == 0) {
			return 0;
		}

		if (dividend == Integer.MIN_VALUE && divisor == -1) {
			return Integer.MAX_VALUE;
		}
		boolean sameSize = (dividend < 0) == (divisor < 0);
		dividend = Math.abs(dividend);
		divisor = Math.abs(divisor);

		return sameSize ? positiveDivide(dividend, divisor) : -positiveDivide(dividend, divisor);
	}

	private int positiveDivide(int dividend, int divisor) {
		if (dividend < divisor) {
			return 0;
		}
		System.out.println("DE: " + dividend);
		int sum = divisor;
		int count = 1;
		while (sum + sum < dividend) {
			if(sum + sum <= 0) {
				break;
			}
			sum += sum;
			count += count;
		}
		System.out.println(dividend + " - " + count + " " + sum);
		return count + positiveDivide(dividend - sum, divisor);
	}

	public void print(int[] nums, int length) {
		for (int i = 0; i < length; i++) {
			System.out.print(nums[i]);
		}
	}
}